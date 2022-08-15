import { UserModel } from "../models/users";



const get = (id) => {
    if(id) return UserModel.findById(id).populate('cart')
    return UserModel.find()
}

const save = (body) => {
    const userModel = new UserModel(body);
    return UserModel.create(userModel)
}

const update = (id, body) => UserModel.findByIdAndUpdate(id, body, {new: true})

const remove = (id) => UserModel.findByIdAndRemove(id)

const getByEmail = (email) => UserModel.findOne({ email: email })

export default {
    get,
    save,
    update,
    remove,
    getByEmail
}