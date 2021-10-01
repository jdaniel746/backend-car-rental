import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import Item from '../../items/models/Item'

class ItemService {
    constructor (
        private readonly docClient: DocumentClient,
        private readonly tableName: string
    ) {}

    async getAllItems (): Promise<Item[]> {
        const result = await this.docClient
            .scan({
                TableName: this.tableName
            })
            .promise()

        return result.Items as Item[]
    }

    async getItem (itemId: string): Promise<Item> {
        const result = await this.docClient
            .get({
                TableName: this.tableName,
                Key: { itemId }
            })
            .promise()

        return result.Item as Item
    }

    async createItem (item: Item): Promise<Item> {
        await this.docClient
            .put({
                TableName: this.tableName,
                Item: item
            })
            .promise()

        return item
    }

    async updateItem (itemId: string, partialItem: Partial<Item>): Promise<Item> {
        const updated = await this.docClient
            .update({
                TableName: this.tableName,
                Key: { itemId },
                UpdateExpression:
                    'set #client = :client, phone = :phone, plate = :plate,' +
                    ' from = :from, to = :to, status = :status, user = :user',
                ExpressionAttributeNames: {
                    '#client': 'client'
                },
                ExpressionAttributeValues: {
                    ':client': partialItem.client,
                    ':phone': partialItem.phone,
                    ':plate': partialItem.plate,
                    ':from': partialItem.from,
                    ':to': partialItem.to,
                    ':status': partialItem.status,
                    ':user': partialItem.user
                },
                ReturnValues: 'ALL_NEW'
            })
            .promise()

        return updated.Attributes as Item
    }

    async deleteItem (itemId: string) {
        return this.docClient
            .delete({
                TableName: this.tableName,
                Key: { itemId }
            })
            .promise()
    }
}

export default ItemService
