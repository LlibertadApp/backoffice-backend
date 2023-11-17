/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string } from 'yup'

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

    try {
        // SARAZA
        // ...
        // 200 OK
        return response({
            code: httpStatusCodes.OK,
            data: {},
        })
    } catch (err: any) {
        return response({ err })
    }
}

export default handler
