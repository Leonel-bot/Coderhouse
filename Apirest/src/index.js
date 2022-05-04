const app = require('./server')
const mainRouter = require('./routes/index')


app.use('/api', mainRouter)



module.exports = app
