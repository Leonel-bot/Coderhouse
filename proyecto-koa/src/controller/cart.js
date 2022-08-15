import createError from "http-errors";
import CartApi from "../api/cart";


const get = async (ctx, next) => {
    const {id} = ctx.params

    const cart = await CartApi.get(id)

    ctx.body = {
        status: 'success',
        data: cart,
    };
    ctx.status = 200;

}


const save = async (ctx, next) => {
    const {body} = ctx.request
    const cart = await CartApi.save(body)

    ctx.body = {
        status: 'success',
        data: cart,
    };
    ctx.status = 200;
    
}

const remove = async (ctx, next) => {
    const { id } = ctx.params
    await CartApi.remove(id);

    ctx.body = {
        status: 'success',
        data: true,
    };
    ctx.status = 200;
}

const addProducts = async (ctx, next) => {

    const {id} = ctx.params
    const {products} = ctx.request.body

    const cart = await CartApi.addProducts(id, products)

    ctx.body = {
        status: 'success',
        data: cart,
    };
    ctx.status = 200;

}


const removeProduct = async (ctx, next) => {
    const {id} = ctx.params
    const {product} = ctx.request.body
    
    const cart = await CartApi.removeProduct(id, product)
    ctx.body = {
        status: 'success',
        data: cart,
    };
    ctx.status = 200;
}

export default {
    get,
    save,
    remove,
    addProducts,
    removeProduct
};