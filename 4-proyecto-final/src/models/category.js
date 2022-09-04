import mongoose from "mongoose";
const {Schema} = mongoose

const categorySchema = new Schema(
    {
        name: {type: String, required: true, unique: true }
    },
    { timestamps: true }
)

export const CategoryModel = mongoose.model('Category', categorySchema)