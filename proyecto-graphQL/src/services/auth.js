import UserApi from "../api/user"
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'


const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passportReqToCallback: true
}


const login = async (username, password, done) => {
    const user = await UserApi.getByEmail(username)
    if (!user) return done(null, false, { msg: 'Usuario no encontrado' })

    const isUser = await bcrypt.compare(password, user.password)
    if (!isUser) return done(null, false, { msg: 'Error en credenciales' });
    return done(null, user)
}

export const userLogin = new Strategy(strategyOptions, login)


passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser( async (userId, done) => {
    const user = await UserApi.get(userId)
    return done(null, user);
});