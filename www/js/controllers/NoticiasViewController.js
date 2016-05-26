angular.module('starter.controllers')
.controller('NoticiasViewController', function($scope, $stateParams, NoticiasService){	
	NoticiasService.noticia($stateParams.id,function(result){
		$scope.noticia = result.data[0];
	});
});