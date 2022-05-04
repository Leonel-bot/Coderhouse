const fs = require('fs')
const {  DBLiteServices } = require('../services/databaseSQLite')


class Chat{

    constructor(){
        DBLiteServices.init()
        this.tableName = tableName
    }


    async getAll(){
        try {
            return await DBLiteServices.get(this.tableName)
        } catch (error) {
            throw new Error(error)            
        }
    }

    async save(data){
        try {
            return await DBLiteServices.create(this.tableName, data)
        } catch (error) {
            throw new Error(error)
        }
    }
}

ChatController = new Chat(
    tableName = "chats"
)

module.exports = {ChatController}