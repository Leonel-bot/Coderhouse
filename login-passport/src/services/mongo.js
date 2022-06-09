import mongoose from "mongoose";

const connectionString = process.env.MONGODB
mongoose.connect(connectionString)
.then(() => console.log('Mongoose connected'))
.catch(e => console.log(e))
