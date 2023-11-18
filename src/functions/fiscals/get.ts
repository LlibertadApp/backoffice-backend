/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string, array } from 'yup'

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import { getFiscal } from '@/helpers/daos/fiscalDao'
import { FiscalCreateRequestBody } from '@/types/api-types.d'

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

        const userId = event.requestContext.authorizer!.lambda.decodedToken.sub

        if (fiscal.createdBy !== userId) {
            // 401 UNAUTHORIZED
            return response({
                code: httpStatusCodes.UNAUTHORIZED,
                err: httpErrors.UNAUTHORIZED,
            })
        }

        // 200 OK
        return response({
            code: httpStatusCodes.OK,
            data: fiscal,
        })
    } catch (err: any) {
        return response({ err })
    }
}

export default handler
