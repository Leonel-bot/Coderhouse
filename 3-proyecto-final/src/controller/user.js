import { UserModel } from "../models/users";
import { CartModel } from "../models/carts";
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { sendEmailNewRegister, sendEmailOrder } from "./email";
import { sendMessage, sendWhatsAppMessage } from "../services/twilio";
import { Config } from "../config";



const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passportReqToCallback: true
}

export const get = async (req, res) => {
    const { id } = req.params
    let user = null
    id ? user = await UserModel.findById(id).populate('cart') : user = await UserModel.find()
    res.json(user)
}


export const save = async (req, res) => {
    const { body } = req
    try {

        const passHash = await bcrypt.hash(body.password, 10)
        const cartModel = new CartModel({ products: [] })

        const userModel = new UserModel({ ...body, password: passHash, cart: cartModel._id });

        await CartModel.create(cartModel)
        const user = await UserModel.create(userModel)
        
        await sendEmailNewRegister(user)
        

        res.json({ success: true, response: user })

    } catch (error) {
        res.json({ success: false, response: error })
    }
}


export const login = async (username, password, done) => {
    const user = await UserModel.findOne({ email: username })
    if (!user) return done(null, false, { msg: 'Usuario no encontrado' })

    const isUser = await bcrypt.compare(password, user.password)
    if (!isUser) return done(null, false, { msg: 'Error en credenciales' });
    return done(null, user)
}


export const createOrder = async (req, res) => {
    const {passport} = req.session
    const userId = passport.user
    const user = await UserModel.findById(userId)
    const cart = await CartModel.findById(user.cart).populate('products')

    await sendEmailOrder(user, cart.products)
    await sendMessage(`+54${user.phone}`, 'Su pedido ha sido recibido y se encuentra en proceso')
   
    await sendWhatsAppMessage(Config.ADMIN_CELLPHONE, `Nuevo pedido de ${user.username}`)
    
    res.json({user, products: cart.products})
} 



export const userLogin = new Strategy(strategyOptions, login)


passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId).then((user) => {
      return done(null, user);
    })
});