import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true}
    },
    { timestamps: true }
)

export const UserModel = model('User', userSchema)