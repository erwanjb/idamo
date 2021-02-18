import * as express from 'express';
import { convertXMLToJS, format } from './services/treatXML';
import { getGoods } from './services/getGoods';
import { storeJSToDB } from './services/treatMongdb';
import * as cors from 'cors';

const port = parseInt(process.env.PORT) || 8080;
const app = express();

const start = async () => {
    const data = await convertXMLToJS();
    const arrData = data.biens.bien;
    storeJSToDB([format(arrData[0]), format(arrData[1])]);
}

start();

const production = process.env.NODE_ENV === 'production';

if (!production) {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
} else {
    app.use('/', express.static(__dirname + '/../dist-client'));
}

app.get('/api/goods', async (_req, res) => {
    res.status(200).send(await getGoods());
})

app.listen(port);