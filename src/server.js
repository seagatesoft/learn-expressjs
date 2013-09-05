var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.listen(80);
console.log('Listening at port 80');