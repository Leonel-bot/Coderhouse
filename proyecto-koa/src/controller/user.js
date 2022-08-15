import UserApi from "../api/user"
import CartApi from "../api/cart"
import bcrypt from 'bcrypt'
import { sendEmailNewRegister, sendEmailOrder } from "./email";
import { sendMessage, sendWhatsAppMessage } from "../services/twilio";
import { Config } from "../config";
import createError from "http-errors";



const get = async (ctx, next) => {
    const { id } = ctx.params
    const user = await UserApi.get(id)
    
    ctx.body = {
        status: 'success',
        data: user
    }
    ctx.status = 200

}


const save = async (ctx, next) => {
    const {body} = ctx.request
    
    const cart = await CartApi.save({ products: [] })
    const passHash = await bcrypt.hash(body.password, 10)
    const user = await UserApi.save({ ...body, password: passHash, cart: cart._id })
    await sendEmailNewRegister(user)

    ctx.body = {
        status: 'success',
        data: user,
    };
    ctx.status = 200;
}

const update = async (ctx, next) => {
    const {id} = ctx.params
    const {body} = ctx.request

    const user = await UserApi.update(id, body)

    ctx.body = {
        status: 'success',
        data: user,
    };
    ctx.status = 200;
    

}

const remove = async (ctx, next) => {
    const {id} = ctx.params
    await UserApi.remove(id)
    
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
    remove,
}