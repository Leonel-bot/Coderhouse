import createError from "http-errors";
import ChatApi from "../api/chat"


const getAll = async () => {
    const chats = await ChatApi.get()
    return chats
}

const get = async (req, res) => {
    const {id} = req.params
    try {
        const chat = await ChatApi.get(id)
        if(id && !chat) res.json({error : createError(400, 'Chat not found')})
        else res.json({response: chat})

    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const save = async (req, res) => {
    const {body} = req
    try {
        const chat = await ChatApi.save(body)
        res.json({response: chat})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        const chat = await ChatApi.get(id)
        if(!chat){
            res.json({error : createError(400, 'Chat not found')})
        } else{
            await ChatApi.remove(id)
            res.json(true)
        }  
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

export default {
    get,
    getAll,
    save,
    remove
}