var mysql = require('mysql');
var pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'sitoko',
   connectionLimit: 5,
   supportBigNumbers: true
});

var sendQuery = function(callback, query, variables) {
   pool.getConnection(function (err, connection) {
      if (err) {
	     callback(err);
		 return;
	  } else {
		 connection.query(query, variables, function(err, results) {
		    if (err) {
			   callback(err);
		       return;
			} else {
			   callback(false, results);
			   connection.release();
			}
		 });
	  }
   });
};

exports.getItemUnitTypeList = function(callback) {
   sendQuery(callback, 'SELECT id, nama FROM item_unit_types');
};

exports.getItemList = function(itemName, limit, callback) {
   if (!limit) {
      limit = 10;
   }

   sendQuery(callback, "SELECT id, barcode, nama FROM items WHERE nama LIKE ? ORDER BY nama LIMIT ?", ['%'+itemName+'%', limit]);
};

exports.getPricePerUnit = function(saleType, itemId, unitId, callback) {
   sendQuery(callback, "SELECT harga_per_satuan FROM item_sale_prices WHERE jenis_penjualan=? AND item_id=? AND item_unit_type_id=?", [saleType, itemId, unitId]);
};