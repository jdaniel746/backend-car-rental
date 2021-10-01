import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../../core/middify";
import formatJSONResponse from "../../core/formatJsonResponse";
import UpdateItem from '../dtos/updateItemDto'
import itemService from '../../database/item'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent & UpdateItem,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
        const itemId: string = event.pathParameters.itemId
        const { body } = event
        try {
            const items = await itemService.updateItem(itemId, body)

            return formatJSONResponse(200, items)
        } catch (err) {
            return formatJSONResponse(400, err)
        }
    }
)
