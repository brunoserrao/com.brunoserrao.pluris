angular.module('starter.controllers').controller('PaginasController', function($scope, $stateParams, PaginasService, StorageService){
	PaginasService.pagina($stateParams.id,function(result){
		if (result) {
			$scope.pagina = result.data;
			StorageService.set('pagina-' + $stateParams.id, $scope.pagina);
		} else {
			$scope.pagina = StorageService.get('pagina-' + $stateParams.id);
		}
	});
});