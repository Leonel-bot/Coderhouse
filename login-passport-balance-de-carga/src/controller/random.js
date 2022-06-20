import { fork } from 'child_process'
import path from 'path'



const scriptPathRandom = path.resolve(__dirname, '../utils/random.js')
export const getRandom = (req, res) => {
    const { cantidad } = req.query
    const computo = fork(scriptPathRandom)
    computo.send(cantidad || 100000000)
    computo.on('message', (result) => {
        res.json({result: result.length})
    })  
}

