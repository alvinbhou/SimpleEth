const express = require('express');
const fs = require('fs');
const https = require('https');
const config = require('./config.js')
var app = express();
app.use(express.static(__dirname)); // Current directory is root
if (config.credential) {
    let options = {
        key: fs.readFileSync(config.credential.key),
        cert: fs.readFileSync(config.credential.cert),
        ca: fs.readFileSync(config.credential.ca),
    }
    https.createServer(options, app).listen(config.port, () => {
        console.log(`server is listening on ${config.port} port...`);        
    });
}
else {
    app.listen(config.port, () => {
        console.log(`server is listening on ${config.port} port...`);
    });
}
