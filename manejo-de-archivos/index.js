const fs = require('fs')

class Contenedor{


    //Recupero todos los productos
    getAll = async () => {
        try {
            let all = await fs.promises.readFile('./productos.txt', 'utf-8')
            if(all){
                return JSON.parse(all)
            }
            return all
        } catch (error) {
            return error.message
        }
    }
    
    //Creo nuevo producto
    save = async (archivo) => {
        let data = await this.getAll() || []
        let id = data[data.length -1]?.id+1 || 1
    
        archivo.id = id
        data.push(archivo)
        let productos = JSON.stringify(data, null, 2)
        try {
            await fs.promises.writeFile('./productos.txt', productos)
            return id
        } catch (error) {
            return error.message
        }
    }
    
    
    //Recupero un producto por su id
    getById = async (id) => {
        const productos = await this.getAll()
        if(productos.length){
            let producto = productos.find(p => p.id === id)
            return producto || 'Producto no encontrado'
        }
        return productos
    }
    
    //Elimino un producto por su id
    deleteById = async (id) => {
        const all = await this.getAll()
        if(all.length){
            let productos = all.filter(p => p.id !== id)
            let data = JSON.stringify(productos, null, 2)
            try {
                await fs.promises.writeFile('./productos.txt', data)
                return 'Borrado'
            } catch (error) {
                return error.message
            }
        }
        return 'No hay productos'
    }
    
    //Elimino todos los productos
    deleteAll = async () => {
        try {
            await fs.promises.writeFile('./productos.txt', '')
            return 'Todo borrado'
        } catch (error) {
            return error.message
        }
    }
    
    
}

module.exports = Contenedor