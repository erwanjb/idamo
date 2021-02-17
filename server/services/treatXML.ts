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

export const format = (obj) => {

    const newObj = {};

        for (const key of Object.keys(obj)) {
            
            if (key.slice(-9) === '_formatee') {
                delete newObj[key.replace(/_/ig, ' ')];           
                newObj[key.replace(/_/ig, ' ').slice(0, -9)] = obj[key][0].trim();
            } else if (key === 'images' || key === 'chauffages' || key === 'climatisations') {
                if (key === 'images' ) {
                    newObj[key.replace(/_/ig, ' ')] = obj[key][0][key.slice(0, -1)].map(img => img._);
                } else {
                    newObj[key.replace(/_/ig, ' ')] = obj[key][0] ? obj[key][0][key.slice(0, -1)] : null;
                }
            } else {
                newObj[key.replace(/_/ig, ' ')] = obj[key][0].trim();
            }

        }
    return newObj;
}