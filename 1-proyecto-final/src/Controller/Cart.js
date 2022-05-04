const { ProductController } = require('../Controller/Products')
const fs = require('fs')

class Cart{

    constructor(file,data){
        this.file = file

        const exist = fs.existsSync(file)
        if(!exist){
            fs.writeFileSync(file, data)
        }
    }


    async getAll(){
        try {
            const all = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            throw new Error(error)            
        }
    }
    
    
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
    
    
    async getById(id){
        const all = await this.getAll()
        let data = all.find(d => d.id == id)
        if(!data) throw new Error('Cart does not exist')
        return data
    }



    async edit(id, body){
        const all = await this.getAll()
        const data = all.filter(d => d.id != id)
        const cart = all.find(d => d.id == id)
        if(!data) throw new Error('Cart does not exist')
        cart.update = Date.now()
        const cartUpdate = {...cart,...body}
        data.push(cartUpdate)
        const allString = JSON.stringify(data, null, 2)
        try {
            await fs.promises.writeFile(this.file, allString)
            return cartUpdate
        } catch (error) {
            throw new Error(error)
        }
    }


    

    async deleteById(id){
        const cart = await this.getById(id)
        if(cart){
            const all = await this.getAll()
            const data = all.filter(i => i.id !== cart.id)
            const newData = JSON.stringify(data, null, 2)
            try {
                await fs.promises.writeFile(this.file, newData)
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }


    async getProducts(id){
        const cart = await this.getById(id)
        const { products } = cart
        return products ? products : []
    }


    async addProducts(id, prods){
        const cart = await this.getById(id)
        let list = []
        await Promise.all(prods.map(async (e) => {
            const p = await ProductController.getById(e)
            list.push(p)
        }));
        cart.products = list
        return this.edit(id, cart)
    }

    async removeProduct(id, prod){
        const cart = await this.getById(id)
        if(!cart) throw new Error('Cart does not exist')
        const { products } = cart
        cart.products = products.filter(p => p.id != prod)
        return this.edit(id, cart)
    }
    
}


CartController = new Cart(
    file = './cart.json',
    data = JSON.stringify([], null, 2)
)

module.exports = { CartController }