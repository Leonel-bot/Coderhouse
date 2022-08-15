import { CartModel } from "../models/carts"


const get = (id = null) => {
    if(id) return CartModel.findById(id).populate('products')
    return CartModel.find().populate('products')
}

const save = (body) => {
    const cart = new CartModel({ ...body})
    return CartModel.create(cart)
}

const update = (id, body) => CartModel.findByIdAndUpdate(id, body, { new: true })

const remove = (id) => CartModel.findByIdAndRemove(id);


const addProducts = async (id, items) => {

    try {
        const cart = await CartModel.findById(id)
        const allProducts = cart.products.push(items)
        cart.products = allProducts
        return await CartModel.findByIdAndUpdate(id, cart, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

const removeProduct = async (id, item) => {
    try {
        const cart = await CartModel.findById(id)
        const allProducts = cart.products.filter(prod => prod != item)
        cart.products = allProducts
        return await CartModel.findByIdAndUpdate(id, cart, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}


export default {
    get,
    save,
    update,
    remove,
    addProducts,
    removeProduct
};