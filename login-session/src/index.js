import server from './services/server'
import 'dotenv/config'
import './services/mongo'
import './services/socket'



const PORT = process.env.PORT
server.listen(PORT, () => { console.log(`Server listen in port ${PORT}`)})