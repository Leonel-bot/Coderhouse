import compression from "compression";
import log4js from "log4js";
import express from "express";
import http from "http"

const app = express()
app.use(compression())

app.use(express.json())

const httpServer = http.Server(app)


app.get('/', (req, res) => {
    
})


const ejemploLogger = () => {
    const logger = log4js.getLogger()

    logger.level ='trace'

    logger.trace('Trace')
    logger.debug('Debug')
    logger.info('Info')
    logger.warn('Warning')
    logger.error('Error')
    logger.fatal('Fatal errro')
}

ejemploLogger()



const ejemploLoggerAppender = () => {
    log4js.configure({
        appenders : {
            fileAppender: { type: 'file', filename: './logs/example-appender.log' },
            consola: { type: 'console' }
        },
        categories : {
            default: {appenders: ['fileAppender', 'consola'], level: 'error'}
        }
    })

    const logger = log4js.getLogger()

    logger.trace('Trace')
    logger.debug('Debug')
    logger.info('Info')
    logger.warn('Warning')
    logger.error('Error')
    logger.fatal('Fatal errro')
}

ejemploLoggerAppender()




export default httpServer