const fs = require('fs')

class Products{

    constructor(file,data){
        this.file = file

        const exist = fs.existsSync(file)
        if(!exist){
            fs.writeFileSync(file, data)
        }
    }

    //Recupero todos los productos
    async getAll(){
        try {
            const all = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            throw new Error(error)            
        }
    }
    
    //Creo nuevo producto
    async save(data){
        const all = await this.getAll()
        const id = all.length > 0 ? all.length+1 : 1

        const timestamp = {create: Date.now(), update: null}
        const newData = {...data, ...timestamp, id}
        all.push(newData)
        const allString = JSON.stringify(all, null, 2)

        try {
            await fs.promises.writeFile(this.file, allString)
            return id
        } catch (error) {
            throw new Error(error)
        }
    }
    
    
    //Recupero un producto por su id
    async getById(id){
        const all = await this.getAll()
        let data = all.find(d => d.id == id)
        if(!data) throw new Error('Item does not exist')
        return data
    }


    //Editar
    async edit(id, body){
        const all = await this.getAll()
        const data = all.filter(d => d.id !== id)
        const item = all.find(d => d.id == id)
        if(!data) throw new Error('Item does not exist')
        item.update = Date.now()
        const productUpdate = {...item,...body}
        data.push(productUpdate)
        const allString = JSON.stringify(data, null, 2)
        try {
            await fs.promises.writeFile(this.file, allString)
            return productUpdate
        } catch (error) {
            throw new Error(error)
        }
    }

    
    //Elimino un producto por su id
    async deleteById(id){
        const item = await this.getById(id)
        if(item){
            const all = await this.getAll()
            const data = all.filter(i => i.id != item.id)
            const newData = JSON.stringify(data, null, 2)
            try {
                await fs.promises.writeFile(this.file, newData)
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
    
    //Elimino todos los productos
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.file, '')
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    
}


ProductController = new Products(
    file = './productos.json',
    data = JSON.stringify([], null, 2)
)

module.exports = {ProductController}