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
	     callback(true);
		 return;
	  } else {
		 connection.query(query, variables, function(err, results) {
		    if (err) {
			   callback(true);
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