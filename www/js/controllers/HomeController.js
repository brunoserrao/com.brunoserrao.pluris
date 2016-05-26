angular.module('starter.controllers')
.controller('HomeController', function($scope, RequestService){
	RequestService.request('GET','/home',null,function(result){
		if (result) {
			$scope.pagina = result.data.pagina.data;
			$scope.noticias = result.data.noticias.data;
		}
	});
});