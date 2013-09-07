var express = require('express');
var app = express();
var db = require('./database');
var SALE_TYPES = ['KULAKAN', 'ECERAN'];

app.use('/static', express.static('public'));

app.get('/sale/new', function(req, res) {
   db.getItemUnitTypeList(function (err, unitTypes) {
      if (err) {
	     res.send('500', 'Database Error: '+err);
	  } else {
	     res.render('sale/new', {'SALE_TYPES': SALE_TYPES, 'unitTypes': unitTypes});
	  }
   });
});

app.set('view engine', 'ejs');

app.listen(1612);
console.log('Listening at port 1612');