import {
    APIGatewayRequestAuthorizerEventV2,
    APIGatewayAuthorizerResult,
    Context,
    PolicyDocument,
} from 'aws-lambda'
import { authorizerErrors } from '@/_core/configs/errorConstants'
import jwt from 'jsonwebtoken'

export enum PolicyEffect {
    Allow = 'Allow',
    Deny = 'Deny',
}

export type EffectType = PolicyEffect.Allow | PolicyEffect.Deny

export const unauthorizedPrincipalId = 'unauthorized-user'

export function generatePolicyDocument(
    effect: EffectType,
    resource: string
): PolicyDocument {
    return {
        Version: '2012-10-17',
        Statement: [
            {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            },
        ],
    }
}

export function generateAuthorizeOutput(
    principalId: string,
    effect: EffectType,
    routeArn: string
): APIGatewayAuthorizerResult {
    return {
        principalId,
        policyDocument: generatePolicyDocument(effect, routeArn),
    }
}

export const handler = async (
    event: APIGatewayRequestAuthorizerEventV2,
    _context: Context
): Promise<APIGatewayAuthorizerResult> => {
    const routeArn = event.routeArn
    try {
        if (!event.headers) {
            console.error(authorizerErrors.NO_HEADERS_PRESENT)
            return generateAuthorizeOutput(
                unauthorizedPrincipalId,
                PolicyEffect.Deny,
                routeArn
            )
        }

        const token = event.headers['Authorization']

        if (!token) {
            console.error(authorizerErrors.UNDEFINED_AUTHORIZATION_HEADER)
            return generateAuthorizeOutput(
                unauthorizedPrincipalId,
                PolicyEffect.Deny,
                routeArn
            )
        }

        const decoded = jwt.verify(token, process.env.BACKOFFICE_JWT_KEY!)
        const principalId = decoded.sub as string

        return generateAuthorizeOutput(
            principalId,
            PolicyEffect.Allow,
            routeArn
        )
    } catch (error) {
        console.error(authorizerErrors.UNEXPECTED_AUTHORIZE_ERROR, error)
        return generateAuthorizeOutput(
            unauthorizedPrincipalId,
            PolicyEffect.Deny,
            routeArn
        )
    }
}
