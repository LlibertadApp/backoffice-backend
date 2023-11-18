/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string, array } from 'yup'

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import { getFiscalsByOwner } from '@/helpers/daos/fiscalDao'
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
        console.log('COSO', event)
        const userId = event.requestContext.authorizer!.jwt.claims.sub
        const fiscals = await getFiscalsByOwner(userId)

        // 200 OK
        return response({
            code: httpStatusCodes.OK,
            data: fiscals,
        })
    } catch (err: any) {
        return response({ err })
    }
}

export default handler
