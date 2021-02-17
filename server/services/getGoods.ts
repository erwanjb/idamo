import { getDB } from '../mongodb/connexion';

export const getGoods = async () => {

    const db = await getDB();

    const collection = db.collection('goods');

    const dataInDb = await collection.find({}).toArray();

    return dataInDb;
}