var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'testes'
		});
}

module.exports = function() {
	return createDBConnection;
}
