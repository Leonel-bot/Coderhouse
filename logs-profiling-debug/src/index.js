import 'dotenv/config'
import server from './services/server'



const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Server listen in port ${PORT}`))