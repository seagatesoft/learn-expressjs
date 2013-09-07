var express = require('express');
var app = express();
var SALE_TYPES = ['KULAKAN', 'ECERAN'];

app.use('/static', express.static('public'));

app.get('/sale/new', function(req, res) {
   res.render('sale/new', {'SALE_TYPES': SALE_TYPES});
});

app.set('view engine', 'ejs');

app.listen(1612);
console.log('Listening at port 1612');