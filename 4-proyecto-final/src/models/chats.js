import mongoose from "mongoose";
const {Schema} = mongoose

const chatSchema = new Schema(
    { 
        email: {type: String, required: true },
        message: {type: String, required: true}
    },
    { timestamps: true }
)


export const ChatModel = mongoose.model('Chat', chatSchema)