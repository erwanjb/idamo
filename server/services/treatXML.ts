import * as xml2js from 'xml2js';
import * as fs from 'fs';

export const getXML = async () => {

    const pathToXml = __dirname + '../../assets/idamo.xml';

    const xml = await fs.readFileSync(pathToXml);

    return xml;
}

export const convertXMLToJS = async () => {

    const xml = await getXML();
    
    const  parser = new xml2js.Parser({ mergeAttrs: true, normalize: true, normalizeTags: true });

    const dataParsed = await parser.parseStringPromise(xml);

    return dataParsed;
}