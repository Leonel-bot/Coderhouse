import createError from "http-errors";
import ProductApi from "../api/product"



const get = async (req, res) => {
    const {id} = req.params
    const products = await ProductApi.get(id)
    res.json({response: products})
}

const save = async (req, res) => {
    const {body} = req
    try {
        const product = await ProductApi.save(body)
        res.json({response: product})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const update = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const product = await ProductApi.update(id, body, {new: true})
        res.json({response: product})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        await ProductApi.remove(id)
        res.json(true)
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

export default {
    get,
    save,
    update,
    remove
}