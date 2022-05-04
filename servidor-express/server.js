const express = require('express')

const app = express()
app.use(express.json())

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server listen in port ${PORT}`);
})

module.exports = app