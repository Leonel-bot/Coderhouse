import server from './services/server'
import minimist from 'minimist';
import 'dotenv/config'
import './services/socket'
//import './services/mongo'

const optionalArgs = {
    alias: {
        p: 'port',
        c: 'cluster'
    },
    default: {
        port: '8080',
        cluster: false
    }
}


/* process.on('exit', (code) => {
    console.log(`BeforeExist: El proceso termino con codigo ${code}`);
}) */

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception:  ${err.message}`);
    process.exit(1)
})
//throw new Error('error node message')

//process.stdout.write('Mensaje desde la consola\n')


export const args = minimist(process.argv, optionalArgs)

const PORT = args.port
server.listen(PORT, () => { console.log(`Server listen in port ${PORT} - PID: ${process.pid}`)})