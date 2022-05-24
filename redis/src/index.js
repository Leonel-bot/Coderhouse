import server from './services/server'
import 'dotenv/config'



const PORT = process.env.PORT
server.listen(PORT, () => { console.log(`Server listen in port ${PORT}`)})