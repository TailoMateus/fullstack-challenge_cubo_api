function DadosDao(connection) {
    this._connection = connection;
}

DadosDao.prototype.salva = function(dados,callback) {
    this._connection.query('INSERT INTO dados SET ?', dados, callback);
}

DadosDao.prototype.lista = function(callback) {
    this._connection.query('select * from dados',callback);
}

DadosDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from dados where id = ?",[id],callback);
}

module.exports = function(){
    return DadosDao;
};
