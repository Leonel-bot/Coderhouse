const fs = require('fs')
const { DBServices } = require('../services/databaseMariaDb')

class Products{

    constructor(tableName){
        DBServices.init()
        this.tableName = tableName
    }

    //Recupero todos los productos
    async getAll(){
        try {
            return await DBServices.get(this.tableName)
        } catch (error) {
            throw new Error(error)            
        }
    }
    
    //Creo nuevo producto
    async save(data){
        try {
            return await DBServices.create(this.tableName, data)
        } catch (error) {
            throw new Error(error)
        }
    }
    
    //Recupero un producto por su id
    async getById(id){
        const data = await DBServices.get(this.tableName, id)
        if(!data) throw new Error('Item does not exist')
        return data
    }


    //Editar
    async edit(id, body){
        try {
            return await DBServices.update(this.tableName, id, body)
        } catch (error) {
            throw new Error(error)
        }
    }

    
    //Elimino un producto por su id
    async deleteById(id){
        try {
            await DBServices.delete(this.tableName, id)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

}


ProductController = new Products(
    tableName = "products"
)

module.exports = {ProductController}