import mongoose from "mongoose";

const connectionString = process.env.MONDODB

mongoose.connect(connectionString)
.then(() => {
    console.log('Mongodb connected');
})
.catch(e => {
    console.log(e);
})
