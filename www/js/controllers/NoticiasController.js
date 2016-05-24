angular.module('starter.controllers')
.controller('NoticiasController', ['$scope','$stateParams','RequestService', function($scope, $stateParams, RequestService){
	RequestService.request('GET','/noticias/' + $stateParams.id,null,function(result){
		if (result) {
			$scope.noticia = result.data[0];
		}
	});
}]);