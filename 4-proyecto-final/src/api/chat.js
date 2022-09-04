import { ChatModel } from "../models/chats"

const get = (id = null) => {
    if(id) return ChatModel.findById(id)
    return ChatModel.find()
}

const save = (body) => {
    const chat = new ChatModel({...body});
    return ChatModel.create(chat)
}

const update = (id, body) => ChatModel.findByIdAndUpdate(id, body, {new: true})

const remove = (id) =>  ChatModel.findByIdAndRemove(id)

const deleteMany = () => ChatModel.deleteMany()

export default {
    get,
    save,
    update,
    remove,
    deleteMany
};