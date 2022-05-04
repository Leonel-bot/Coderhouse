const fs = require('fs')


class Chat{

    constructor(file, data){
        this.file = file

        const exist = fs.existsSync(file)
        !exist && fs.writeFileSync(file, data)
    }


    async getAll(){
        try {
            const all = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            throw new Error(error)            
        }
    }

    async save(data){
        const all = await this.getAll()
        const id = all.length > 0 ? all.length+1 : 1

        const newData = {...data, id}
        all.push(newData)
        const allString = JSON.stringify(all, null, 2)

        try {
            await fs.promises.writeFile(this.file, allString)
            return newData
        } catch (error) {
            throw new Error(error)
        }
    }
}

ChatController = new Chat(
    file = './chat.json',
    data = JSON.stringify([], null, 2)
)

module.exports = {ChatController}