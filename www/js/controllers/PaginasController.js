angular.module('starter.controllers').controller('PaginasController', function($scope, $stateParams, PaginasService){
	// RequestService.request('GET','/pagina/' + $stateParams.id,null,function(result){
	// 	if (result) {
	// 		$scope.apresentacao = result.data;
	// 	}
	// });

	PaginasService.pagina($stateParams.id,function(result){
		$scope.apresentacao = result.data;
	});
});