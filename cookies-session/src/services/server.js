import express from "express";
import cookieParser from "cookie-parser"

import http from "http"

const app = express()
app.use(express.json())

const secretCookie = 'password'
app.use(cookieParser(secretCookie))

app.get('/set-cookie', (req, res) => {
    //res.cookie('lang', 'EN', {signed: true}).json({message: "Cookie set"})
    res.cookie('cookie', 'cookie con vencimiento', {maxAge: 3000, signed: true}).json({message: "Cookie expires in 3000ms"})
})

app.get('/get-cookies', (req, res) => {
    res.json(req.cookies)
})

app.get('/clr-cookie', (req, res) => {
    res.clearCookie('lang').json({message: "Cookie remove"})
})




const httpServer = http.Server(app)

export default httpServer