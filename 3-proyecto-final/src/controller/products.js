import { ProductModel } from "../models/products";


export const get = async (req, res) => {
    const {id} = req.params
    let item = []
    id ? item = await ProductModel.findById(id) : item =  await ProductModel.find()
    res.json(item)
}

export const save = async (req, res) => {
    const {body} = req 
    const product = new ProductModel(body);
    try {
        const response =  await ProductModel.create(product)
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req, res) => {
    const {id} = req.params
    const {body} = req
    try {
        const response = await ProductModel.findByIdAndUpdate(id, body, {new: true})
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    const {id} = req.params
    try {
        await ProductModel.findByIdAndRemove(id)
        res.json(true)
    } catch (error) {
        console.log(error);
    }
}