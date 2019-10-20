const https = require ('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world');
});

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});