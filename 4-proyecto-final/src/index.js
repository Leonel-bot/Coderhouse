import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";
import 'dotenv/config'
import webSocketServer from './services/socket'
import server from './services/server'
import MongoDBClient from './services/mongo';
import cluster from "cluster"
import os from "os"




const PORT = process.env.PORT || 8080

server.listen(PORT, async () => {
    await MongoDBClient.connect();
    console.log(`Server listen in port ${PORT} - PID: ${process.pid}`)
})
//Cantidad de nucleos
/* const numCPUs = os.cpus().length

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
} */
