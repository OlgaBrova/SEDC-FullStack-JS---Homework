const http = require('http');
const textService = require('./textService');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (url.startsWith('/monica')) {

        if (method === 'GET') {

            const text = textService.readDataFromDb('./dbMonica.json');
            res.setHeader('Content-Type', 'text/html');
            res.write(text);
            res.end();
        }
    }
});

server.listen(3000, () => {
    console.log('Server is active at http://localhost:3000');
});