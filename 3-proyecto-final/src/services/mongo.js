import mongoose from "mongoose";

const connectionString = process.env.MONGODB


export default class MongoDBClient {
	static _connect;

	static connect(local = false) {
		if(!MongoDBClient._connect) {
			MongoDBClient._connect = true;
            console.log('Estableciendo conexion Mongo');
			mongoose.connect(connectionString, {}).then((connection) => {
				this._client = connection;
			});
		}
	}

	static disconnect(){
		mongoose.disconnect()
	}
}
