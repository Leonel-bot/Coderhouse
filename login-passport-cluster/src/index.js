import server from './services/server'
import minimist from 'minimist';
import 'dotenv/config'
import './services/socket'
import cluster from "cluster"
import os from "os"
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


process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception:  ${err.message}`);
    process.exit(1)
})



const args = minimist(process.argv, optionalArgs)
const PORT = args.port

//Cantidad de nucleos
const numCPUs = os.cpus().length

if(cluster.isMaster){

    for(let i = 0; i < numCPUs; i++){
        //Creo tantos process como numero de nucleos
        cluster.fork()
    }

    //Si el process se muere lo creo nuevamente
    cluster.on('exit',(worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork()
    })

}else{

    server.listen(PORT, () => { console.log(`Server listen in port ${PORT} - PID: ${process.pid}`)})

}

