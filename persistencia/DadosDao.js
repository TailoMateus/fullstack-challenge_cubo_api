function DadosDao(connection) {
    this._connection = connection;
}

DadosDao.prototype.salva = function(dados,callback) {
    this._connection.query('INSERT INTO dados SET ?', dados, callback);
}

DadosDao.prototype.atualiza = function(dados,callback) {
    this._connection.query('UPDATE dados SET status = ? where id = ?', [dados.status, dados.id], callback);
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