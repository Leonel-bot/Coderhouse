import passport from 'passport'
import {Strategy} from 'passport-local'

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passportReqToCallback: true
}


const login = async (req, username, password, done) => {
    console.log('login');
    try {
        return done(null, false, {msg: 'Usuario no encontrado'})
    } catch (error) {
        return done(null, /* la respuesta */)
    }
}

const signup = async (req, username, password, done) => {
    console.log('signup');
}


export const userLogin = new Strategy(strategyOptions, login)
export const userSignup = new Strategy(strategyOptions, signup)



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((userId, done) => {
    /* UserModel.findById(userId).then(user => {
        return done(null, user)
    }) */
})