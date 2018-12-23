const crypto = require('crypto'),
  fs = require("fs"),
  http = require("http");

var privateKey = fs.readFileSync('/etc/letsencrypt/live/invata-altfel.com/cert.pem').toString();
var certificate = fs.readFileSync('/etc/letsencrypt/live/invata-altfel.com/privkey.pem').toString();

var credentials = crypto.createCredentials({key: privateKey, cert: certificate});

var handler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
};

var server = http.createServer();
server.setSecure(credentials);
server.addListener("request", handler);
server.listen(8000);
