import express from "express";
import http from "http"
import router from "../router/index";

const app = express()

app.use(express.json())
app.use('/api', router)

const httpServer = http.Server(app)

export default httpServer