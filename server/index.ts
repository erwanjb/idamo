import * as express from 'express';

const port = parseInt(process.env.PORT) || 8080;
const app = express();

app.listen(port);