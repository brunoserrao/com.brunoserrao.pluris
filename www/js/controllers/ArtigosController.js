'use strict';
angular.module('starter.controllers')
.controller('ArtigosController', function($scope, $timeout, $stateParams, ArtigosService, StorageService){
	$scope.paged = 1;
	$scope.items_disponiveis = true;
	$scope.artigos = [];

	$scope.carregarArtigos = function(loading){
		ArtigosService.artigos($scope.paged, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.artigos.push(result.data[i]);
				}
				
				StorageService.set('artigos',$scope.artigos);
				StorageService.set('artigos-paging',$scope.paging);

				$scope.paging = result.paging;

				if ( result.paging.actual_page == result.paging.total_pages  ) {
					$scope.items_disponiveis = false;
				} else {
					$scope.paged = result.paging.actual_page + 1;
				}

				$timeout(function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');	
				}, 500);
			} else {
				$scope.artigos = StorageService.get('artigos');
				$scope.paging = StorageService.get('artigos-paging');
				$scope.items_disponiveis = false;
			}
		});
	}

	$scope.carregarArtigo = function(loading){
		var id = $stateParams.id;
		
		ArtigosService.artigo(id, loading, function(result){
			if (result) {
				$scope.artigo = result.data[0];
				StorageService.set('artigo-' + id, $scope.artigo);
			} else {
				$scope.artigo = StorageService.get('artigo-' + id);
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}
});