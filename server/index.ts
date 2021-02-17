import * as express from 'express';
import { convertXMLToJS } from './services/treatXML';
import { getGoods } from './services/getGoods';
import { storeJSToDB } from './services/treatMongdb';

const port = parseInt(process.env.PORT) || 8080;
const app = express();

const start = async () => {

    storeJSToDB(await convertXMLToJS());
}

start();

app.get('/api/goods', (_req, res) => {
    res.status(200).send(getGoods());
})

app.listen(port);