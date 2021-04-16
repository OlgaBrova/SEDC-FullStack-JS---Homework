const http = require('http');
const { v4: uuidv4 } = require('uuid');
const textService = require('./textService');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (url.startsWith('/moana')) {

        if (method === 'GET') {

            const text = textService.readDataFromDb('./dbMoana.json');
            res.setHeader('Content-Type', 'text/html');
            res.write(text);
            res.end();
        }


        if (method === 'POST') {
         
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const answer = JSON.parse(parsedBody);
                answer.id = uuidv4();

                const dbData = textService.readDataFromDb('./dbAnswers.json');
                const dbDataObject = JSON.parse(dbData);

                dbDataObject.answers.push(answer);
                const dbDataStringified = JSON.stringify(dbDataObject);

                textService.writeDataToDb('./dbAnswers.json', dbDataStringified);
            })
            res.setHeader('Content-Type', 'text/html');
            res.write('{"message": "Success!"}');
            res.end();
        }
    }
});

server.listen(3000, () => {
    console.log('Server is active at http://localhost:3000');
});