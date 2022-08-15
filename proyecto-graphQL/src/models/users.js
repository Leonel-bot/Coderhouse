import { Schema, model } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: {type: String, required: true},
        address: {type: String, required: true},
        age: {type: Number, required: true},
        phone: {type: Number, required: true},
        password: { type: String, required: true},
        avatar: { type: String, required: true},
        cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
    },
    { timestamps: true }
)

export const UserModel = model('User', userSchema)

export const UserModelGraphQl = composeWithMongoose(UserModel)