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

export const handler = async (
    event: APIGatewayEvent,
    _context: Context,
    callback: Callback
): Promise<any> => {
    global.cb = callback

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

        console.log('USER2', user)

        if (user == null) {
            // 401 UNAUTHORIZED
            return response({
                code: httpStatusCodes.UNAUTHORIZED,
                err: httpErrors.UNAUTHORIZED,
            })
        }

        const res: LoginResponseBody = {
            status: 'SUCCESS',
            token: 'asdfasdf',
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
