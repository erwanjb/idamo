import { MongoClient } from 'mongodb';

export const getDB = async () => {
 
    // Connection URL
    const url =  process.env.DB_URL;

    // Database Name
    const dbName = process.env.DB_NAME || 'idamo';

    const client = await MongoClient.connect(url).catch(err => { console.log(err); }) as MongoClient;

    const db = client.db(dbName);

    return db;
}