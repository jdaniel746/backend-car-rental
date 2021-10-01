import {
    APIGatewayEvent,
    Handler,
    Context,
    APIGatewayProxyResult,
} from "aws-lambda";
import middify from "../../core/middify";
import formatJSONResponse from "../../core/formatJsonResponse";
import itemService from '../../database/item'

export const handler: Handler = middify(
    async (
        event: APIGatewayEvent,
        context: Context
    ): Promise<APIGatewayProxyResult> => {
        try {
            const items = await itemService.getAllItems()

            return formatJSONResponse(200, items)
        } catch (err) {
            return formatJSONResponse(400, err)
        }
    }
)
