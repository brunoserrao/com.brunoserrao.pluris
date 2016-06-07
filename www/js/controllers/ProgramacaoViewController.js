angular.module('starter.controllers')
.controller('ProgramacaoViewController', function($scope, $timeout, $stateParams, $translate, EventosService, StorageService, ToastService){

	$scope.favoritado = false;

	$scope.carregarEvento = function(loading) {
		var id = $stateParams.id;
		
		EventosService.evento(id, loading,function(result){
			if (result) {
				$scope.evento = result.data[0];
				StorageService.set('evento-' + id, $scope.evento);
			} else {
				$scope.evento = StorageService.get('evento-' + id);
			}

			checarFavorito($scope.evento);

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	};

	$scope.favorito = function(evento){
		if (typeof ionic.Platform.device().available !== 'undefined'){
			var chave = 'favorito-evento-' + evento.ID;
			var evento_chave = StorageService.get(chave);

			window.plugins.calendar.hasReadWritePermission(
				function(result) {
					if (result) {
						if (evento_chave) {
							removerFavorito(evento, chave);
						} else {
							adicionarFavorito(evento, chave);
						}
					} else {
						window.plugins.calendar.requestReadWritePermission();
						$scope.favorito(evento);
					}
				}
			);
		}
	};

	removerFavorito = function(evento, chave){
		var d1 = new Date(evento.metas.date_start[0] + 'T' + evento.metas.time_start[0]);
		var d2 = new Date(evento.metas.date_end[0] + 'T' + evento.metas.time_end[0]);

		var startDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
		var endDate = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(), d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds());
		var title = evento.post_title;
		var eventLocation = $translate.instant('CONGRESSO');
		var notes = evento.post_content;

		var success = function(id) {
			StorageService.remove(chave);
			checarFavorito(evento);
			ToastService.message($translate.instant('EVENTO_REMOVIDO_DA_AGENDA'));
		};
		
		var error = function(id) { 
			console.log("Remove Error: " + chave); 
		};

		window.plugins.calendar.deleteEvent(title,null,null,startDate,endDate,success,error);
	}

	adicionarFavorito = function(evento, chave){
		var d1 = new Date(evento.metas.date_start[0] + 'T' + evento.metas.time_start[0]);
		var d2 = new Date(evento.metas.date_end[0] + 'T' + evento.metas.time_end[0]);

		var startDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
		var endDate = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(), d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds());
		var title = evento.post_title;
		var eventLocation = $translate.instant('CONGRESSO');
		var notes = evento.post_content;

		var success = function(id) {
			StorageService.set(chave, evento.ID);
			checarFavorito(evento);
			ToastService.message($translate.instant('EVENTO_ADICIONADO_NA_AGENDA'));
		};
		
		var error = function(id) { 
			console.log("Error: " + chave); 
		};

		window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
	}

	var	checarFavorito = function(evento){
		var evento_chave = 'favorito-evento-' + evento.ID;
		$scope.favoritado = StorageService.get(evento_chave) ? true : false;
	}
});