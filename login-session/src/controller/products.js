import { ProductModel } from "../models/product";
import { faker } from '@faker-js/faker';


export const get = async (req, res) => {
    const products = []
    for (let i = 0; i < 5; i++) {
        const product = new ProductModel({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.food()
        })
        products.push(product)
    }
    return products
}