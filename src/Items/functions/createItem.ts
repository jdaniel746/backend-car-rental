import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda'
import * as uuid from 'uuid'
import middify from '../../core/middify'
import formatJSONResponse from '../../core/formatJsonResponse'
import itemService from '../../database/item'
import CreateItem from '../dtos/createItemDto'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent & CreateItem,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
        const { client, phone, plate, from, to, status, user } = event.body

        try {
            const itemId: string = uuid.v4()
            const item = await itemService.createItem({
                itemId,
                client,
                phone,
                plate,
                from,
                to,
                status,
                user,
                createdAt: new Date().toISOString()
            })

            return formatJSONResponse(201, item)
        } catch (err) {
            return formatJSONResponse(400, err)
        }
    }
)
