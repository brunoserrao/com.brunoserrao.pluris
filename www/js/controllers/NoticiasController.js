'use strict';
angular.module('starter.controllers')
.controller('NoticiasController', function($scope, $timeout, NoticiasService, StorageService){
	$scope.paged = 1;
	$scope.items_disponiveis = true;
	$scope.noticias = [];

	$scope.carregarNoticias = function(loading){
		NoticiasService.noticias($scope.paged, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.noticias.push(result.data[i]);
				}
				
				StorageService.set('noticias',$scope.noticias);
				StorageService.set('noticias-paging',$scope.paging);
			
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
				$scope.noticias = StorageService.get('noticias');
				$scope.paging = StorageService.get('noticias-paging');
				$scope.items_disponiveis = false;
			}
		});
	}
});