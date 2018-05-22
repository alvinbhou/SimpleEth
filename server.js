var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname)); // Current directory is root

app.listen(8000);
console.log('Listening on port 8000');