import createError from "http-errors";
import ProductApi from "../api/product"
import CategoryApi from "../api/category"



const get = async (req, res) => {
    const {id} = req.params
    try {
        const products = await ProductApi.get(id)
        if(id && !products) res.json({error : createError(400, 'Product not found')})
        else res.json({response: products})

    } catch (error) {
        res.json({error : createError(400, error)})
    }
}

const save = async (req, res) => {
    const {body, file} = req
    body.image = file.path
    try {
        const product = await ProductApi.save(body)
        res.json({response: product})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const update = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const product = await ProductApi.update(id, body, {new: true})

        if(!product) res.json({error : createError(400, 'Product not found')})
        else res.json({response: product})
    }
    catch (error) {
        res.json({error : createError(400, error)})
    }
}

const remove = async (req, res) => {
    const {id} = req.params
    try {
        const product = await ProductApi.get(id)
        if(!product){
            res.json({error : createError(400, 'Product not found')})
        } else{
            await ProductApi.remove(id)
            res.json(true)
        }  
    } catch (error) {
        res.json({error : createError(400, error)})
    }
}


const productsByCategoryId = async (req, res) => {
    const {categoryId} = req.params
    
    try {
        const category = await CategoryApi.get(categoryId)
        if(!category) {
            res.json({error : createError(400, 'Category not found')})
        }else{
            const products = await ProductApi.findByCategoryId(category._id)
            res.json({response: products})
        }
    } catch (error) {
         res.json({error : createError(400, error)})
    }

    
}

export default {
    get,
    save,
    update,
    remove,
    productsByCategoryId
}