import express from "express";
import http from "http"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { StoreOptions } from './session'
import passport from 'passport'
import router from "../router/index";
import { userLogin } from "./auth";

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


const httpServer = http.Server(app)

export default httpServer