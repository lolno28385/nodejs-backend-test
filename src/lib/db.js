import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default async callback => {

	const mongod = new MongoMemoryServer();
	const uri = await mongod.getConnectionString();



	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
	
	callback(mongoose);
};
