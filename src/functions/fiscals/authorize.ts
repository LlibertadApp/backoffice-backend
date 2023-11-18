/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string, array } from 'yup'
import * as admin from "firebase-admin";

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import { getFiscal } from '@/helpers/daos/fiscalDao'
import { initializeFirebaseAdminApp } from "@/_core/firebase/firebase-admin";

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

    // This enables Lambda function to complete
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const fiscalId = event.pathParameters?.id
        if (!fiscalId) {
            return response({
                code: httpStatusCodes.BAD_REQUEST,
                err: JSON.stringify(event.pathParameters),
            })
        }

        const fiscal = await getFiscal(fiscalId)

        if (!fiscal) {
            // 404 NOT FOUND
            return response({
                code: httpStatusCodes.NOT_FOUND,
                err: httpErrors.NOT_FOUND,
            })
        }

        const userId = event.requestContext.authorizer!.jwt.claims.sub

        if (fiscal.createdBy !== userId) {
            // 401 UNAUTHORIZED
            return response({
                code: httpStatusCodes.UNAUTHORIZED,
                err: httpErrors.UNAUTHORIZED,
            })
        }

        await initializeFirebaseAdminApp();

        const votingTables = fiscal.votingTables.map(i => i.id)

        const customToken = await admin.auth().createCustomToken(fiscal!.id, {
          votingTables,
          fullName: fiscal.fullName,
        });

        // 200 OK
        return response({
            code: httpStatusCodes.OK,
            data: {
              link: `${process.env.FRONT_END_URL}/?authToken=${customToken}`
            },
        })
    } catch (err: any) {
        return response({ err })
    }
}

export default handler
