'use strict';
angular.module('starter.controllers')
.controller('NoticiasViewController', function($scope, $timeout, $stateParams, NoticiasService, StorageService){
	$scope.carregarNoticia = function(loading) {
		NoticiasService.noticia($stateParams.id, true,function(result){
			if (result) {
				$scope.noticia = result.data[0];
				StorageService.set('noticia-' + $stateParams.id, $scope.pagina);
			} else {
				$scope.noticia = StorageService.get('noticia-' + $stateParams.id);
			}
		});

		$timeout(function(){
			$scope.$broadcast('scroll.refreshComplete');
		},500)
	};
});