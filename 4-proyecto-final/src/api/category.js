import { CategoryModel } from "../models/category";

const get = (id = null) => {
    if(id) return CategoryModel.findById(id)
    return CategoryModel.find()
}

const save = (body) => {
    const product = new CategoryModel({...body});
    return CategoryModel.create(product)
}

const update = (id, body) => CategoryModel.findByIdAndUpdate(id, body, {new: true})

const remove = (id) =>  CategoryModel.findByIdAndRemove(id)

const deleteMany = () => CategoryModel.deleteMany()

export default {
    get,
    save,
    update,
    remove,
    deleteMany
};
