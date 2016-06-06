angular.module('starter.controllers')
.controller('ProgramacaoViewController', function($scope, $timeout, $stateParams, EventosService, StorageService){

	$scope.carregarEvento = function(loading) {
		var id = $stateParams.id;
		
		EventosService.evento(id, loading,function(result){
			if (result) {
				$scope.evento = result.data[0];
				StorageService.set('evento-' + id, $scope.evento);
			} else {
				$scope.evento = StorageService.get('evento-' + id);
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});

		$scope.checarFavorito(id);
	};

	$scope.checarFavorito = function(id){
		key = 'favorito-evento-' + id;
		$scope.favoritado = StorageService.get(key) ? true : false;
	}

	$scope.toggleFavorito = function(evento){
		key = 'favorito-evento-' + evento.ID;

		if (StorageService.get(key)) {
			StorageService.remove(key);
		} else{
			var d1 =  new Date(evento.startTime);
			var d2 =  new Date(evento.endTime);
			var startDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), 0, 0);
			var endDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), 0, 0);
			var title = evento.title;
			var eventLocation = "Home";
			var notes = "Some notes about this event.";
			var success = function(message) { alert("Success: " + JSON.stringify(message)); };
			var error = function(message) { alert("Error: " + message); };

			window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);

			StorageService.set(key, evento.ID);
		}

		// $scope.checarFavorito(evento.ID);
	};

	$scope.favorito = function(evento){
		window.plugins.calendar.hasReadWritePermission(function(result){
			if (result) {
				$scope.toggleFavorito(evento);
			} else {

			}
		});

		$scope.checarFavorito(evento.ID);
	}

	$scope.calendarioPedirPermissao = function(callback){
		return window.plugins.calendar.requestReadWritePermission();
	}
});