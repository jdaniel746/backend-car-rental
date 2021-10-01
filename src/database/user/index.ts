import createDynamoDBClient from '../db'
import UserService from './userService'

const { USERS_TABLE } = process.env

const userService = new UserService(createDynamoDBClient(), USERS_TABLE)

export default userService
