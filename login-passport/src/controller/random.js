import { fork } from 'child_process'
import path from 'path'
import { calculo } from "../utils/calculo";


export const getBlocker = (req, res) => {
    const result = calculo()
    res.json({result})
}

const scriptPath = path.resolve(__dirname, '../utils/calculo.js')
export const getNotBlocker = (req, res) => {
    const computo = fork(scriptPath)
    computo.send('start')
    computo.on('message', (sum) => {
        res.json({result: sum})
    }) 
}


const scriptPathRandom = path.resolve(__dirname, '../utils/random.js')
export const getRandom = (req, res) => {
    const { cantidad } = req.query
    const computo = fork(scriptPathRandom)
    computo.send(cantidad || 100000000)
    computo.on('message', (result) => {
        res.json({result: result.length})
    })  
}

