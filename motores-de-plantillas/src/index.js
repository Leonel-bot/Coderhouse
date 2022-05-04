const app = require('./server')
const mainRouter = require('./routes/index')
const { ProductController } = require('./Controller/Products')


app.use('/api', mainRouter)


app.get('/', async (req, res) => {
    const products = await ProductController.getAll()
    res.render('form', {products: products})
})




module.exports = app
