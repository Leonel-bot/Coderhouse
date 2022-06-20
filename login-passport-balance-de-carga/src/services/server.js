import express from 'express'
import http from 'http'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { getChat } from '../controller/chats'
import { get } from '../controller/products'
import mainRouter from '../router/index'
import { StoreOptions } from './session'
import { authMiddleware } from '../middleware'
import passport from 'passport'
import { userLogin, userSignup } from './auth'
import os from "os"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use(session(StoreOptions))
app.use('/api', mainRouter)
app.use('/public',express.static('public'))
app.set('view engine', 'ejs')
const viewsPath = path.resolve(__dirname, '../../views')
app.set('views', viewsPath)

//Iniciar passport
app.use(passport.initialize())
app.use(passport.session())

passport.use('login', userLogin)
passport.use('signup', userSignup)




app.get('/', authMiddleware, async (req, res) => {
    const products = await get()
    const chats = await getChat()
    const { username } = req.session.passport
    res.render('list', {products: products, chats: chats, username: username})
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})



app.post('/signup', (req, res, next) => {
    passport.authenticate('signup', {}, (err, user, info) => {
        if(err){
            return next(err)
        }
        if(!user) return res.status(401).json({data: info})
        res.json({msg: 'Signup'})
    })(req, res, next)
})


app.post('/login', passport.authenticate('login', {}),
    (req, res ) => {
        res.json({msg: 'wellcome'})
    }
)


app.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) res.status(404).send({msg: 'error'})
        else res.send({msg: 'loguout ok'})
    })
})


app.get('/info', (req, res) => {
    const info = {
        'Argumentos': process.argv,
        'Plataforma' : process.platform,
        'Node Version': process.version,
        'Memoria reservada': process.memoryUsage().rss,
        'Path ejecucion': process.execPath,
        'Process ID': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Number of process': os.cpus().length
    }
    res.json(info)
})


app.get('/slow', (req, res) => {
    let response = 0
    for (let i = 0; i < 6e9; i++) {
        response += i
    }
    res.json({res: response})
    
})

app.get('/cluster', (req, res) => {
    res.json({
        pid: process.pid
    })
})

//Mato el proceso
app.get('/die', (req, res) => {
    res.json({msg: 'OK'})
    process.exit(0)
})



const httpServer = http.createServer(app)

export default httpServer