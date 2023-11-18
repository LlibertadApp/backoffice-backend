/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string, array } from 'yup'

import response from '@/helpers/response'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import { createFiscal } from '@/helpers/daos/fiscalDao'
import { FiscalCreateRequestBody } from '@/types/api-types.d'

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

    // This enables Lambda function to complete
    context.callbackWaitsForEmptyEventLoop = false

    const payload = JSON.parse(event.body!) as FiscalCreateRequestBody

    const schema = object({
        fullName: string().required(),
        email: string().email(),
        phoneNo: string(),
        votingTables: array().of(string()),
    })

    try {
        // Validamos el payload
        await schema.validate(payload)

        const dataFiscal = {
            fullName: payload.fullName,
            email: payload.email,
            phoneNo: payload.phoneNo,
            createdBy: event.requestContext.authorizer!.lambda.decodedToken.sub
        }

        const fiscal = await createFiscal(dataFiscal, payload.votingTables)

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
