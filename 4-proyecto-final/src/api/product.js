import { ProductModel } from "../models/products"



const get = (id = null) => {
    if(id) return ProductModel.findById(id).populate('category')
    return ProductModel.find().populate('category')
}

const findByCategoryId = (category) => {
    return ProductModel.find({category: category}).populate('category')
}

const save = (body) => {
    const product = new ProductModel({...body});
    return ProductModel.create(product)
}

const update = (id, body) => ProductModel.findByIdAndUpdate(id, body, {new: true})

const remove = (id) =>  ProductModel.findByIdAndRemove(id)

const deleteMany = () => ProductModel.deleteMany()



export default {
    get,
    save,
    update,
    remove,
    deleteMany,
    findByCategoryId
};