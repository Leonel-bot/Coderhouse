const express = require('express')

const app = express()
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public',express.static(__dirname + '/public'))




const PORT = 8080
app.listen(PORT,() => {
    console.log(`Server listen in port ${PORT}`);
})

module.exports = app