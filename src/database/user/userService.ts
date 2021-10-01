import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import User from '../../users/models/User'

class UserService {
  constructor (
        private readonly docClient: DocumentClient,
        private readonly tableName: string
    ) {}

  async getAllUsers (): Promise<User[]> {
    const result = await this.docClient
            .scan({
                TableName: this.tableName
            })
            .promise()

    return result.Items as User[]
  }

  async getUser (userId: string): Promise<User> {
    const result = await this.docClient
            .get({
                TableName: this.tableName,
                Key: { userId }
            })
            .promise()

    return result.Item as User
  }

  async createUser (user: User): Promise<User> {
    await this.docClient
            .put({
              TableName: this.tableName,
              Item: user
            })
            .promise()

    return user
  }

  async updateUser (userId: string, partialUser: Partial<User>): Promise<User> {
    const updated = await this.docClient
            .update({
                TableName: this.tableName,
                Key: { userId },
                UpdateExpression:
                    'set #email = :email, firstnames = :firstnames, lastnames = :lastnames,' +
                    ' phone = :phone, address = :address, birthdate = :birthdate, role = :role',
                ExpressionAttributeNames: {
                    '#email': 'email'
                },
                ExpressionAttributeValues: {
                    ':email': partialUser.email,
                    ':firstnames': partialUser.firstnames,
                    ':lastnames': partialUser.lastnames,
                    ':phone': partialUser.phone,
                    ':address': partialUser.address,
                    ':birthdate': partialUser.birthdate,
                    ':role': partialUser.role
                },
                ReturnValues: 'ALL_NEW'
            })
            .promise()

    return updated.Attributes as User
  }

  async deleteUser (userId: string) {
    return this.docClient
            .delete({
              TableName: this.tableName,
              Key: { userId }
            })
            .promise()
  }
}

export default UserService
