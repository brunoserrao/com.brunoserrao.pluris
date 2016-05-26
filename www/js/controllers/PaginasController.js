angular.module('starter.controllers').controller('PaginasController', function($scope, $stateParams, PaginasService){
	PaginasService.pagina($stateParams.id,function(result){
		$scope.pagina = result.data;
	});
});