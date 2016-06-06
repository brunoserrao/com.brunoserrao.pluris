angular.module('starter.controllers').controller('PaginasController', function($scope, $timeout, $stateParams, PaginasService, StorageService){
	$scope.carregarPagina = function(loading){
		PaginasService.pagina($stateParams.id, loading, function(result){
			if (result) {
				$scope.pagina = result.data;
				StorageService.set('pagina-' + $stateParams.id, $scope.pagina);
			} else {
				$scope.pagina = StorageService.get('pagina-' + $stateParams.id);
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}
});