module.exports = function(app) {
	app.get('/index', function(req, res){
		console.log('Recebi a requisição');
		res.send('OK');
	});

	app.delete('/index/dados/:id', function(req, res) {
		var id = req.params.id;
		var dados = {};

		dados.id = id;
		dados.status = 'CANCELADO';

		var connection = app.persistencia.connectionFactory();
		var dadosDao = new app.persistencia.DadosDao(connection);
		
		dadosDao.atualiza(dados, function(erro){
			if(erro) {
				res.status(500).send(erro);
				return;
			}

			res.status(204).send(dados);
		});
	});

	app.put('/index/dados/:id', function(req, res) {
		var id = req.params.id;
		var dados = {};

		dados.id = id;
		dados.status = 'CONFIRMADO';

		var connection = app.persistencia.connectionFactory();
		var dadosDao = new app.persistencia.DadosDao(connection);
		
		dadosDao.atualiza(dados, function(erro){
			if(erro) {
				res.status(500).send(erro);
				return;
			}

			res.send(dados);
		});
	}

	app.post('/index/dados', function(req, res){
		
		req.assert("nome", 
			"Nome eh obrigatorio").notEmpty();

		req.assert("sobrenome", 
			"Sobrenome eh obrigatorio").notEmpty();

		req.assert("participacao", 
			"Participacao eh obrigatorio").notEmpty();

		var erros = req.validationErrors();

		if(erros) {
			console.log("Erros de validacao");
			res.status(400).send(erros);
			return;
		}

		var dados = req.body;

		dados.status = 'CRIADO';
		dados.data = new Date;

		var connection = app.persistencia.connectionFactory();
		var dadosDao = new app.persistencia.DadosDao(connection);

		dadosDao.salva(dados, function(erro, resultado){
			
			dados.id = resultado.insertId;

			res.location('/index/dados/' + dados.id);

			if(erro) {
				res.status(500).send(erros);
			}
			else {
				console.log('Dados Criado');

				var response = {
					dados_da_pessoa: dados,
					links: [
						{
							href:"http://localhost:3000/index/dados"+dados.id,
							rel:"confirmar",
							method:"PUT"
						}
					]
				}
				
				res.status(201).json(response);
			}
		});
	})
}