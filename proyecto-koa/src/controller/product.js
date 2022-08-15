import createError from "http-errors";
import ProductApi from "../api/product"


const get = async (ctx, next) => {
    const {id} = ctx.params
    const products = await ProductApi.get(id)

    ctx.body = {
        status: 'success',
        data: products
    }
    ctx.status = 200

}

const save = async (ctx, next) => {
    const {body} = ctx.request

    const product = await ProductApi.save(body)

    ctx.body = {
        status: 'success',
        data: product,
    };
    ctx.status = 200;
}

const update = async (ctx, next) => {
    const {id} = ctx.params
    const {body} = ctx.request
    
    const product = await ProductApi.update(id, body, {new: true})

    ctx.body = {
        status: 'success',
        data: product,
    };
    ctx.status = 200;
}

const remove = async (ctx, next) => {
    const {id} = ctx.params
    await ProductApi.remove(id)
    ctx.body = {
        status: 'success',
        data: true,
    };
    ctx.status = 200;

}

export default {
    get,
    save,
    update,
    remove
}