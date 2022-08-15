import express from "express";
import http from "http"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { StoreOptions } from './session'
import passport from 'passport'
import router from "../router/index";
import { userLogin } from "./auth";
import createError from "http-errors";
import { graphqlHTTP } from "express-graphql";
import { graphqlSchema } from "./graphql"

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use(session(StoreOptions))

//GraphQl
app.use('/graphql', graphqlHTTP({
   schema: graphqlSchema,
   graphiql: true
}))

app.use('/api', router)
app.use((req, res) => res.json({error : createError(400, 'Ruta no encontrada')}));


//Iniciar passport
app.use(passport.initialize())
app.use(passport.session())

passport.use('login', userLogin)


const httpServer = http.Server(app)

export default httpServer