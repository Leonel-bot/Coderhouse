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



app.get('/', authMiddleware, async (req, res) => {
    const products = await get()
    const chats = await getChat()
    const username = req.session.info.username
    res.render('list', {products: products, chats: chats, username: username})
})

app.get('/login', async (req, res) => {
    res.render('login')
})


app.post('/login', (req, res) => {
    const {username} = req.body
    if(username){
        req.session.info = {
            loggedIn: true,
            counter: 1,
            username: username
        }
        res.json({msg: 'Login!'})
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) res.status(404).send({msg: 'error'})
        else res.send({msg: 'loguout ok'})
    })
})

const httpServer = http.createServer(app)

export default httpServer