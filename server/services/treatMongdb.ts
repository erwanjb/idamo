import { getDB } from '../mongodb/connexion';

export const storeJSToDB = async (obj: any[]) => {

    const db = await getDB();

    const collection = db.collection('goods');

    const dataInDb = await collection.find({}).toArray();

    // ne store qu'une fois dans la collection

    if(!dataInDb.length) {
        collection.insertMany(obj);
    }
}