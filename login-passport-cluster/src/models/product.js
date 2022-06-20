import mongoose from "mongoose";
const {Schema} = mongoose

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: String
    },
    { timestamps: true }
)
 export const ProductModel = mongoose.model('Product', productSchema)