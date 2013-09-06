var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.get('/sale/new', function(req, res) {
   res.render('sale/new');
});

app.set('view engine', 'ejs');

app.listen(1612);
console.log('Listening at port 1612');