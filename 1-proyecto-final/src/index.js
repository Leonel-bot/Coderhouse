const app = require('./server')
const mainRouter = require('./routes/index')
const { ProductController } = require('./Controller/Products')


app.use('/api', mainRouter)





module.exports = app
