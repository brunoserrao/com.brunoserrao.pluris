'use strict';
angular.module('starter.controllers').controller('ProgramacaoController', function($rootScope, $scope, $stateParams, $timeout, $ionicModal, $translate, ToastService, StorageService, RequestService){
	$scope.favoritado = false;

	$ionicModal.fromTemplateUrl('templates/programacao/pergunta.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.salvarDiaSelecionado = function(dia) {
		StorageService.set('programacao-dia-selecionado', dia);
	}
	
	$scope.carregarProgramacao = function(loading) {
		RequestService.request('GET','/programacao',null, loading, function(result){
			if (result) {
				$scope.descricao = result;
				StorageService.set('programacao-descricao',result);
			} else {
				$scope.descricao  = StorageService.get('programacao-descricao');
			}
		});
	}

	$scope.carregarCategorias = function(loading) {
		$scope.dia =  StorageService.get('programacao-dia-selecionado');
		$scope.categoria = StorageService.get('programacao-categoria-selecionada');

		if ($scope.categoria) {
			$scope.data = {
				dia : $scope.dia,
				categoria_id : $scope.categoria.cat_ID
			};
		} else {
			$scope.data = {
				dia : $scope.dia
			};
		}		

		RequestService.request('POST','/eventos/categorias', $scope.data, loading, function(result){
			if (result) {
				$scope.categorias = result.data;
				StorageService.set('programacao-categorias', $scope.categorias);
			}

			$scope.hideLoading();
		});
	}

	$scope.salvarCategoriaSelecionada = function(categoria){
		StorageService.set('programacao-categoria-selecionada', categoria);
	}

	$scope.salvarSubCategoriaSelecionada = function(categoria){
		StorageService.set('programacao-subcategoria-selecionada', categoria);
	}

	$scope.carregarEventos = function(loading) {
		$scope.dia = StorageService.get('programacao-dia-selecionado');
		$scope.categoria = StorageService.get('programacao-categoria-selecionada');
		
		$scope.data = {
			dia : $scope.dia,
			categoria_id : $scope.categoria.cat_ID
		};

		RequestService.request('POST','/eventos', $scope.data, loading, function(result){
			if (result) {
				$scope.eventos = result.data;
			}

			$scope.hideLoading();
		});
	}


	$scope.carregarPosters = function(loading) {
		$scope.dia = StorageService.get('programacao-dia-selecionado');
		$scope.categoria = StorageService.get('programacao-categoria-selecionada');
		
		$scope.data = {
			categoria_id : $scope.categoria.cat_ID
		};

		RequestService.request('POST','/eventos', $scope.data, loading, function(result){
			if (result) {
				$scope.eventos = result.data;

				$scope.data = {
					dia : $scope.dia
				};
			}

			$scope.hideLoading();
		});
	}

	$scope.carregarSubEventos = function(loading) {
		$scope.dia = StorageService.get('programacao-dia-selecionado');
		$scope.categoria = StorageService.get('programacao-categoria-selecionada');
		$scope.subcategoria = StorageService.get('programacao-subcategoria-selecionada');

		var dia = $stateParams.dia;
		var categoria_id = $stateParams.categoria_id;
		
		$scope.data = {
			dia : dia,
			categoria_id : categoria_id
		};

		RequestService.request('POST','/eventos', $scope.data, loading, function(result){
			if (result) {
				$scope.eventos = result.data;
			}

			$scope.hideLoading();
		});
	}

	$scope.carregarEvento = function(loading) {
		var id = $stateParams.id;

		$scope.dia = StorageService.get('programacao-dia-selecionado');
		$scope.subcategoria = StorageService.get('programacao-subcategoria-selecionada');
		$scope.categoria = StorageService.get('programacao-categoria-selecionada');
		
		$scope.data = {
			dia : $scope.dia,
			categoria_id : $scope.categoria.cat_ID
		};

		$scope.checarFavorito('favorito-evento-' + id);

		RequestService.request('GET','/eventos/' + id, null, loading, function(result){
			if (result) {
				$scope.evento = result.data[0];
				StorageService.set('evento-' + id, $scope.evento);
			} else {
				$scope.evento = StorageService.get('evento-' + id);
			}

			$scope.hideLoading();
		});
	};

	$scope.formEnviarPergunta = function() {
		if(!$scope.user){
			$scope.login();
		} else {
			$scope.modal.show();
		}
	}

	$scope.enviarPergunta = function(loading) {
		var id = $stateParams.id;
		var data = {
			id : id,
			form : {
				mensagem : formPergunta.mensagem.value
			}
		};

		RequestService.request('POST','/eventos/enviar_pergunta', data, loading, function(result){
			if (result) {
				$scope.closeModal();
				formPergunta.reset();
				ToastService.message($translate.instant('PERGUNTA_ENVIADA_COM_SUCESSO'));
			} else {
				ToastService.message($translate.instant('FALHA_AO_ENVIAR_A_PERGUNTA'));
			}

			$scope.hideLoading();
		});
	}

	$scope.favorito = function(evento){
		if (typeof ionic.Platform.device().available !== 'undefined'){
			var chave = 'favorito-evento-' + evento.ID;
			

			window.plugins.calendar.hasReadWritePermission(function(result){
				if (!result) {
					window.plugins.calendar.requestReadWritePermission();
				}
			});

			window.plugins.calendar.hasReadWritePermission(function(result) {
					if (result) {
						if ($scope.favoritado) {
							$scope.removerFavorito(evento, chave);
						} else {
							$scope.adicionarFavorito(evento, chave);
						}
					}
				}
			);
		}
	};

	$scope.removerFavorito = function(evento, chave){
		var d1 = new Date(evento.metas.date_start[0] + 'T' + evento.metas.time_start[0]);
		var d2 = new Date(evento.metas.date_end[0] + 'T' + evento.metas.time_end[0]);

		var startDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
		var endDate = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(), d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds());
		var title = evento.post_title;
		var eventLocation = $translate.instant('CONGRESSO');
		var notes = evento.post_content;

		var success = function(id) {
			StorageService.remove(chave);
			ToastService.message($translate.instant('EVENTO_REMOVIDO_DA_AGENDA'));

			$timeout(function(){
				$scope.checarFavorito(chave);
			},500)
		};
		
		var error = function(id) { 
			console.log("Remove Error: " + chave); 
		};

		window.plugins.calendar.deleteEvent(title,null,null,startDate,endDate,success,error);
	}

	$scope.adicionarFavorito = function(evento, chave){
		var d1 = new Date(evento.metas.date_start[0] + 'T' + evento.metas.time_start[0]);
		var d2 = new Date(evento.metas.date_end[0] + 'T' + evento.metas.time_end[0]);

		var startDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
		var endDate = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(), d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds());
		var title = evento.post_title;
		var eventLocation = $translate.instant('CONGRESSO');
		var notes = evento.post_content;

		var success = function(id) {
			StorageService.set(chave, evento.ID);
			ToastService.message($translate.instant('EVENTO_ADICIONADO_NA_AGENDA'));

			$timeout(function(){
				$scope.checarFavorito(chave);
			},500)
		};
		
		var error = function(id) { 
			console.log("Error: " + chave); 
		};

		window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
	}

	$scope.hideLoading = function(){
		$timeout(function(){
			$scope.$broadcast('scroll.refreshComplete');
		}, 500);
	}

	$scope.checarFavorito = function(chave){
		$scope.favoritado = StorageService.get(chave) ? true : false;
	}
});