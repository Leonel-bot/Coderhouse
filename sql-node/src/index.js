const express = require('express')
const path = require('path')
const app = express()
const { options } = require('../options/mysql')
const knex = require('knex')(options)
 

const PORT = 8080
app.listen(PORT,() => {
    console.log(`Server listen in port ${PORT}`);
})

/* knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.string('products')
}).then(() => console.log('table crated')) */




module.exports = app
