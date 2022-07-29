import { ProductModel } from "../models/products"



const get = (id = null) => {
    if(id) return ProductModel.findById(id)
    return ProductModel.find()
}

const save = (body) => {
    const product = new ProductModel({...body});
    return ProductModel.create(product)
}

const update = (id, body) => ProductModel.findByIdAndUpdate(id, body, {new: true})

const remove = (id) =>  ProductModel.findByIdAndRemove(id)


export default {
    get,
    save,
    update,
    remove
};