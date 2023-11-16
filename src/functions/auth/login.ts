/// <reference path="../../symbols.d.ts" />
import 'reflect-metadata'
import { APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { object, string } from 'yup'
import { v4 as uuidv4 } from 'uuid'

import response from '@/helpers/response'
import { User } from '@/helpers/models/entities/userEntity'
import { login } from '@/helpers/daos/userDao'
import { LoginRequestBody, LoginResponseBody } from '@/types/api-types.d'
import { httpErrors, httpStatusCodes } from '@/_core/configs/errorConstants'
import jwt from 'jsonwebtoken'

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

    // This enables Lambda function to complete
    context.callbackWaitsForEmptyEventLoop = false

    const payload = JSON.parse(event.body!) as LoginRequestBody

    try {
        const schema = object({
            username: string().required(),
            password: string().required(),
        })

        // Validamos el payload
        await schema.validate(payload)

        const { username, password } = payload
        const user = await login(username, password)

        if (user == null) {
            // 401 UNAUTHORIZED
            return response({
                code: httpStatusCodes.UNAUTHORIZED,
                err: httpErrors.UNAUTHORIZED,
                data: {
                  status: 'FAILURE',
                }
            })
        }

        const tokenPayload = {
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 3600,
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_KEY);

        const res: LoginResponseBody = {
            status: 'SUCCESS',
            token: token,
        }

        // 200 OK
        return response({
            code: httpStatusCodes.OK,
            data: res,
        })
    } catch (err: any) {
        return response({ err })
    }
}

export default handler
