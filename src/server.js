var express = require('express');
var app = express();
var db = require('./database');
var SALE_TYPES = ['KULAKAN', 'ECERAN'];

app.use('/static', express.static('public'));
app.use(express.bodyParser());

app.get('/sale/new', function(req, res) {
   db.getItemUnitTypeList(function (err, unitTypes) {
      if (err) {
	     res.send('500', 'Database Error: '+err).message;
	  } else {
	     res.render('sale/new', {'SALE_TYPES': SALE_TYPES, 'unitTypes': unitTypes});
	  }
   });
});

app.post('/sale/saveTransaction', function(req, res) {
   // TODO
   // var json = req.body;
   // validate data
   // save transaction
   // send response
   res.send({'success': true, 'message': ''});
});

app.get('/items/searchByName', function(req, res) {
   var itemName = req.query.itemName;
   if (/^(\w|\d)(\w|\d| )*/.test(itemName)) {
      db.getItemList('%'+itemName+'%', 10, function(err, items) {
	     if (err) {
		    res.send({'items': {}, 'found': false, 'errorMessage': 'Database error: '+err.message});
		 } else {
		    res.send({'items': items, 'found': true});
         }
	  });
   } else {
      res.send({'found': false, 'items': {}, 'errorMessage': 'Item keyword is not valid!'});
   }
});

app.get('/items/getPricePerUnit', function(req, res) {
   var idPattern = /^\d+$/;
   if (SALE_TYPES.indexOf(req.query.saleType) != -1 && idPattern.test(req.query.itemId) && idPattern.test(req.query.unitId)) {
      db.getPricePerUnit(req.query.saleType, req.query.itemId, req.query.unitId, function(err, items) {
	     if (err) {
		    res.send({'pricePerUnit': null, 'found': false, 'errorMessage': 'Database error: '+err.message});
		 } else {
		    if (items.length > 0) {
               res.send({'pricePerUnit': items[0].harga_per_satuan, 'found': true});
			} else {
			   res.send({'pricePerUnit': 0, 'found': true});
			}
         }
	  });
   } else {
      res.send({'pricePerUnit': 0, 'found': false, 'errorMessage': 'Invalid price search parameter!'});
   }
});

app.post('/items/getPriceForItems', function(req, res) {
   // TODO
   // validate data
   // get price
   // send response
   var json = req.body;

   for (var index=0;index<json.items.length;index++) {
      json.items[index].pricePerUnit = 10000;
   }
   
   res.send(json);
});

app.set('view engine', 'ejs');

app.listen(1612);
console.log('Listening at port 1612');