import passport from 'passport'
import {Strategy} from 'passport-local'
import { UserModel } from '../models/user';
import bcrypt from  'bcrypt'



const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passportReqToCallback: true
}


const login = async (username, password, done) => {
    
    const user = await UserModel.findOne({username})
    if(!user) return done(null, false, {msg: 'Usuario no encontrado'})

    const isUser = await bcrypt.compare(password, user.password)
    if(!isUser) return done(null, false, {msg: 'Error en credenciales'});
    return done(null, user)
}

const signup = async (username, password, done) => {
    try {
        const passHash = await bcrypt.hash(password, 10)
        const newUser = await UserModel.create({username, password: passHash})
        return done(null, newUser)
    } catch (error) {
        console.log(error);
        return done(null, false, {msg: 'Error', error})
    }
}


export const userLogin = new Strategy(strategyOptions, login)
export const userSignup = new Strategy(strategyOptions, signup)



passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})