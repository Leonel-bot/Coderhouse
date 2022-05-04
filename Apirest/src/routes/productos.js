const express = require('express')
const productos = express.Router()
const multer = require('multer')

const Contenedor = require('../Contenedor')


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


const folderUpload = './src/public/uploads'
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, folderUpload)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({dest: folderUpload, storage})


productos.get('/', ( req, res ) => {
    product.getAll().then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})

productos.get('/:id', ( req, res ) => {
    const {id} = req.params
    product.getById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    }) 
})

productos.post('/', upload.single('imagen'), (req, res) => {
    const {title, price} = req.body
    const file = req.file
    if(!file){
        const error = new Error('La imagen es requerida')
        res.status(400).json({error: error.message})
    }
    const thumbnail = `http://localhost:8080/public/uploads/${file.filename}`
    const newProduct = {title, price, thumbnail}
    product.save(newProduct).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })

})

productos.put('/:id', upload.single('imagen'), (req, res) => {
    const {id} = req.params
    const {title, price} = req.body
    const file = req.file
    const thumbnail = `http://localhost:8080/public/uploads/${file.filename}`
    const newProduct = {title, price, thumbnail}
    product.edit(Number(id), newProduct).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


productos.delete('/:id', (req, res) => {
    const {id} = req.params
    product.deleteById(id).then(r => {
        res.json(r)
    }).catch(error => {
        res.status(400).send(error.message)
    })
})


module.exports = productos