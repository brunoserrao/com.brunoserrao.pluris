angular.module('starter.controllers')
.controller('NoticiasController', ['$scope','$stateParams','RequestService', function($scope, $stateParams, RequestService){
	RequestService.request('get','posts/' + $stateParams.id,null,function(data){
		if (data) {
			$scope.noticia = data;
		}
	});
}]);