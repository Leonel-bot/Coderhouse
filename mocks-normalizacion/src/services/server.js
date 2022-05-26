import { log } from 'console'
import express from 'express'
import http from 'http'
import path from 'path'
import { getChat } from '../controller/chats'
import { get } from '../controller/products'
import mainRouter from '../router/index'

const app = express()

app.use(express.json())
app.use('/public',express.static('public'))

app.set('view engine', 'ejs')
const viewsPath = path.resolve(__dirname, '../../views')
app.set('views', viewsPath)


app.use('/api', mainRouter)

app.get('/', async (req, res) => {
    const products = await get()
    const chats = await getChat()
    res.render('list', {products: products, chats: chats})
})


const httpServer = http.createServer(app)

export default httpServer