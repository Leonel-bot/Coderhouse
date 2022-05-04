const { app } = require('./server')
const webSocketServer = require('./socket')
const mainRouter = require('./routes/index')
const { ProductController } = require('./Controller/Products')
const { ChatController } = require('./Controller/Chat')





app.use('/api', mainRouter)


app.get('/', async (req, res) => {
    const products = await ProductController.getAll()
    const chats = await ChatController.getAll()
    res.render('form', {products: products, chats: chats})
})

module.exports = app
