const xml2js = require('xml2js')


module.exports.xml2Json = str => {
    return new Promise((resolve, reject) => {
        const parseString = xml2js.parseString;
        parseString(str, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
     });
};

module.exports.json2Xml = obj => {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
};