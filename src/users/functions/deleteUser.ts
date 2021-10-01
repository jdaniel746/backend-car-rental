import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda'
import middify from '../../core/middify'
import formatJSONResponse from '../../core/formatJsonResponse'
import userService from '../../database/user'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
      const userId: string = event.pathParameters.userId
      try {
        const users = await userService.deleteUser(userId)

        return formatJSONResponse(200, users)
      } catch (err) {
        return formatJSONResponse(400, err)
      }
    }
)
