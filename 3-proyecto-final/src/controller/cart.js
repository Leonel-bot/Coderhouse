import { response } from "express";
import { CartModel } from "../models/carts";


export const get = async (req, res) => {
    const { id } = req.params
    let item = []
    id ? item = await CartModel.findById(id).populate('product') : item = await CartModel.find().populate('product')
    res.json(item)
}

export const save = async (req, res) => {
    try {
        const cart = new CartModel({...req, products: [] })
        const response = await CartModel.create(cart)
        res.json({success: true, response})
    }
    catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    const { id } = req.params
    try {
        await CartModel.findByIdAndRemove(id);
        res.json(true)
    } catch (error) {
        console.log(error);
        res.json(false)
    }
}

export const addProducts = async (req, res) => {
    const { id } = req.params
    const { products } = req.body
    
    try {
        const cart = await CartModel.findById(id)
        const allProducts = cart.products.push(products)
        cart.products = allProducts
        const response = await CartModel.findByIdAndUpdate(id, cart, { new: true })
        res.json({success: true, response})
    } catch (error) {
        res.json({success: false, response: error})
    }
}

export const getProducts = async (req, res) => {
    const { id } = req.params
    const cart = await CartModel.findById(id).populate('products')
    res.json(cart)
}

export const removeProduct = async (req, res) => {
    const { id, id_prod } = req.params
    try {
        const cart = await CartModel.findById(id)
        const allProducts = cart.products.filter(prod => prod != id_prod)
        cart.products = allProducts
        const response = await CartModel.findByIdAndUpdate(id, cart, { new: true })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

