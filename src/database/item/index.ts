import createDynamoDBClient from '../db'
import ItemService from './itemService'

const { ITEMS_TABLE } = process.env

const itemService = new ItemService(createDynamoDBClient(), ITEMS_TABLE)

export default itemService
