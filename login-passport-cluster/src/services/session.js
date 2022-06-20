import session from 'express-session'
import sessionFileStore from 'session-file-store'
import 'dotenv/config'
import MongoStore from 'connect-mongo'


const ttlSeconds = 180;

export const StoreOptions = {
  store: MongoStore.create({
    mongoUrl:  process.env.MONGODB,
    crypto: { secret: 'squirrel'},
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: ttlSeconds * 1000, }
};