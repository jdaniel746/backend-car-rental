import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda'
import * as uuid from 'uuid'
import middify from '../../core/middify'
import formatJSONResponse from '../../core/formatJsonResponse'
import userService from '../../database/user'
import CreateUser from '../dtos/createUserDto'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent & CreateUser,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
      const { email, firstnames, lastnames, phone, birthdate, address, role } = event.body

      try {
        const userId: string = uuid.v4()
        const user = await userService.createUser({
          userId,
          email,
          firstnames,
          lastnames,
          phone,
          address,
          birthdate,
          role,
          createdAt: new Date().toISOString()
        })

        return formatJSONResponse(201, user)
      } catch (err) {
        return formatJSONResponse(400, err)
      }
    }
)
