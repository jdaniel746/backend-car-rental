import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda'
import middify from '../../core/middify'
import formatJSONResponse from '../../core/formatJsonResponse'
import userService from '../../database/user'
import UpdateUser from '../dtos/updateUserDto'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent & UpdateUser,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
      const userId: string = event.pathParameters.userId
      const { body } = event
      try {
        const users = await userService.updateUser(userId, body)

        return formatJSONResponse(200, users)
      } catch (err) {
        return formatJSONResponse(400, err)
      }
    }
)
