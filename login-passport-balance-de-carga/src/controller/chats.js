import { ChatModel } from "../models/chat";
import { normalize, denormalize, schema } from 'normalizr';

export const saveChat = async (body) => {
    try {
        const chat = new ChatModel(body)
        return await ChatModel.create(chat)
    } catch (error) {
        console.log(error.message);
    }
}

export const getChat = async () => {
    return ChatModel.find()
}


export const normalizrChats = (data) => {

    const author = new schema.Entity('authors', {}, {
        idAttribute: 'email'
    })

    const chat = new schema.Entity('chats', {
        author: author
    })

    const finalSchema = [chat]
    const normalizedData = normalize(data, finalSchema)

    return normalizedData
}


export const denormalizrChats = (data) => {
    const author = new schema.Entity('authors', {}, {
        idAttribute: 'email'
    })

    const chat = new schema.Entity('chats', {
        author: author
    })
    const finalSchema = [chat]
    const denormalizedData = denormalize( data.result, finalSchema, data.entities);
    return denormalizedData
}