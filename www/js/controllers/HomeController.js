angular.module('starter.controllers')
.controller('HomeController', ['$scope','RequestService', function($scope, RequestService){
	RequestService.request('GET','/noticias',null,function(result){
		if (result) {
			$scope.noticias = result.data;
		}
	});
}]);