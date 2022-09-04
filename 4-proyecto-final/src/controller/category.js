import createError from "http-errors";
import CategoryApi from "../api/category"

const get = async (req, res) => {
    const {id} = req.params
    try {
        const category = await CategoryApi.get(id)
        if(id && !category) res.json({error : createError(400, 'Category not found')})
        else res.json({response: category})

    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const save = async (req, res) => {
    const {body} = req
    try {
        const category = await CategoryApi.save(body)
        res.json({response: category})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const update = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const category = await CategoryApi.update(id, body, {new: true})

        if(!category) res.json({error : createError(400, 'Category not found')})
        else res.json({response: category})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        const category = await CategoryApi.get(id)
        if(!category){
            res.json({error : createError(400, 'Category not found')})
        } else{
            await CategoryApi.remove(id)
            res.json(true)
        }  
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

export default {
    get,
    save,
    update,
    remove
}