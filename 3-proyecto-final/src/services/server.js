import express from "express";
import http from "http"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { StoreOptions } from './session'
import passport from 'passport'
import { userLogin } from "../controller/user";
import router from "../router/index";
import { sendEmail } from "./email";

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use(session(StoreOptions))

app.use('/api', router)

//Iniciar passport
app.use(passport.initialize())
app.use(passport.session())

passport.use('login', userLogin)



app.post('/login',  passport.authenticate('login', {}), (req, res) => {
    res.json({msg: 'wellcome', user: req.user})
})

app.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) res.status(404).send({msg: 'error'})
        else res.send({msg: 'loguout ok'})
    })
})


const httpServer = http.Server(app)

export default httpServer