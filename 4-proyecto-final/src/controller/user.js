import UserApi from "../api/user"
import CartApi from "../api/cart"
import bcrypt from 'bcrypt'
import { sendEmailNewRegister, sendEmailOrder } from "./email";
import { sendMessage, sendWhatsAppMessage } from "../services/twilio";
import { Config } from "../config";
import createError from "http-errors";



const get = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserApi.get(id)
        if(id && !user) res.json({error : createError(400, 'User not found')})
        else res.json({response: user})
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}


const save = async (req, res) => {
    const { body } = req
    try {

        const cart = await CartApi.save({ products: [] })

        const passHash = await bcrypt.hash(body.password, 10)
        const user = await UserApi.save({ ...body, password: passHash, cart: cart._id })
       
        await sendEmailNewRegister(user)
        
        res.json({ response: user })

    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const update = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const user = await UserApi.update(id, body)

        if(!user) res.json({error : createError(400, 'User not found')})
        else res.json({response: user})
    } catch (error) {
        res.json({error : createError(400, error)})
    }

}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        const user = await UserApi.get(id)
        if(!user){
            res.json({error : createError(400, 'User not found')})
        }else{
            await UserApi.remove(id)
            res.json(true)
        }
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const createOrder = async (req, res) => {
    const {passport} = req.session
    const userId = passport.user
    
    const user = await UserApi.get(userId)

    const cart = await CartApi.get(user.cart._id)

    const {products} = cart
    if(!products.length) res.json({error : createError(400, 'empty cart')})
    
    await sendEmailOrder(user, products)
    await sendMessage(`+54${user.phone}`, 'Su pedido ha sido recibido y se encuentra en proceso')
   
    await sendWhatsAppMessage(Config.ADMIN_CELLPHONE, `Nuevo pedido de ${user.username}`)
    
    res.json({user, products: products})
}

export default {
    get,
    save,
    update,
    remove,
    createOrder
}











/* const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passportReqToCallback: true
}


export const login = async (username, password, done) => {
    const user = await UserModel.findOne({ email: username })
    if (!user) return done(null, false, { msg: 'Usuario no encontrado' })

    const isUser = await bcrypt.compare(password, user.password)
    if (!isUser) return done(null, false, { msg: 'Error en credenciales' });
    return done(null, user)
}

export const userLogin = new Strategy(strategyOptions, login)


passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId).then((user) => {
      return done(null, user);
    })
}); */