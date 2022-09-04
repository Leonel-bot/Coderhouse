import express from "express";
import http from "http"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { StoreOptions } from './session'
import passport from 'passport'
import router from "../router/index";
import { userLogin } from "./auth";
import createError from "http-errors";
import bodyParser from "body-parser"
import path from "path";
import ChatController from "../controller/chat"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(session(StoreOptions))

app.use('/api', router)

//Iniciar passport
app.use(passport.initialize())
app.use(passport.session())

passport.use('login', userLogin)



const publiPath = path.resolve(__dirname, '../../public')
app.use('/public',express.static(publiPath))

app.set('view engine', 'ejs')
const viewsPath = path.resolve(__dirname, '../views')
app.set('views', viewsPath)

app.get('/', async (req, res) => {
    const chats = await ChatController.getAll()
    //console.log(chats);
    res.render('form', {chats: chats})
    //res.render('form')
})

app.use((req, res) => res.json({error : createError(400, 'Ruta no encontrada')}));


const httpServer = http.Server(app)

export default httpServer