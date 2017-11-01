module.exports = function(app) {
	app.get('/index', function(req, res){
		console.log('Recebi a requisição');
		res.send('OK');
	});

	app.post('/index/dados', function(req, res){
		var dados = req.body;

		dados.status = 'CRIADO';
		dados.data = new Date;

		var connection = app.persistencia.connectionFactory();
		var dadosDao = new app.persistencia.DadosDao(connection);

		dadosDao.salva(dados, function(erro, resultado){
			console.log('Dados Criado');
			res.json(dados);
		});
	})
}