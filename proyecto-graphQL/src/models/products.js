import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
const { Schema } = mongoose

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, max: 10 },
        image: String
    },
    { timestamps: true }
)

export const ProductModel = mongoose.model('Product', productSchema)

export const ProductModelGraphQl = composeWithMongoose(ProductModel)