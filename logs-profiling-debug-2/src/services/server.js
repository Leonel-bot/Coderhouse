import express from "express";
import http from "http"

const app = express()

app.use(express.json())

const httpServer = http.Server(app)


app.get('/', (req, res) => {
    
})

export default httpServer