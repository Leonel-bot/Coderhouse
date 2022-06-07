import mongoose from "mongoose";

const connectionString = process.env.MONGODB
mongoose.connect(connectionString)
.then(() => console.log('Mongoose connected'))
.catch(e => console.log(e))


/* import mongoose from "mongoose";

const connectionString = process.env.MONGODB

mongoose.connect(connectionString)
.then(() => {
    console.log('Mongodb connected');
})
.catch(e => {
    console.log(e);
}) */
