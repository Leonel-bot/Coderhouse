import mongoose from "mongoose";
const {Schema} = mongoose

const cartSchema = new Schema(
    { products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] },
    { timestamps: true }
)


export const CartModel = mongoose.model('Cart', cartSchema)