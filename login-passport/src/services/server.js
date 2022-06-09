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


/* app.post('/login', (req, res) => {
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
}) */

const httpServer = http.createServer(app)

export default httpServer