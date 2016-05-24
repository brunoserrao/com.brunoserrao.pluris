angular.module('starter.controllers')
.controller('HomeController', ['$scope','RequestService', function($scope, RequestService){
	RequestService.request('GET','/home',null,function(result){
		if (result) {
			$scope.apresentacao = result.data.apresentacao.data;
			$scope.noticias = result.data.noticias.data;
		}
	});
}]);