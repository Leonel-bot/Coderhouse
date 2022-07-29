import createError from "http-errors";
import CartApi from "../api/cart";


const get = async (req, res) => {
    const {id} = req.params

    const cart = await CartApi.get(id)
    res.json({response: cart})
}


const save = async (req, res) => {
    const {body} = req
    try {
        const cart = await CartApi.save(body)
        res.json({response: cart})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const remove = async (req, res) => {
    const { id } = req.params
    try {
        await CartApi.remove(id);
        res.json(true)
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const addProducts = async (req, res) => {
    const {id} = req.params
    const { products } = req.body

    try{
        const cart = await CartApi.addProducts(id, products)
        res.json({response: cart})

    }catch(error){
        res.json({error : createError(400, error)})
    }
}


const removeProduct = async (req, res) => {
    const {id} = req.params
    const { product } = req.body
    try{
        const cart = await CartApi.removeProduct(id, product)
        res.json({response: cart})

    }catch(error){
        res.json({error : createError(400, error, { expose: false })})
    }
}

export default {
    get,
    save,
    remove,
    addProducts,
    removeProduct
};