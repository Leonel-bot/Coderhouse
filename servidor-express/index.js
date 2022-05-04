const app = require('./server')
const Contenedor = require('./src/Contenedor')


const items = [
    {
      title: "Escuadra",
      price: 123.45,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 1
    },
    {
      title: "Calculadora",
      price: 300.40,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 2
    },
    {
      title: "Regla",
      price: 100.00,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 3
    }
]

const product = new Contenedor(
    file = './productos.txt',
    data = JSON.stringify(items, null, 2)
)



app.get('/productos', (req, res) => {
    product.getAll().then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

app.get('/productoRandom', async (req, res) => {
    const all = await product.getAll()
    const id = Math.floor(Math.random() * all.length) + 1;
    product.getById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.send(error.message)
    })
})