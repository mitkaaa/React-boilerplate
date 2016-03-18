'use strict'

var http = require('http');
var fs = require('fs');
var port = 8081

http.createServer(function (req, res) {
    console.log('Ready on port '+ port)
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('<h2>Ready</h2>');
}).listen(port);