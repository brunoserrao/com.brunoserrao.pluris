angular.module('starter.controllers')
.controller('NoticiasController', function($scope, NoticiasService, StorageService){
	paged = 1;
	$scope.items_disponiveis = true;
	$scope.noticias = [];

	$scope.carregarNoticias = function(){
		NoticiasService.noticias(paged,function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.noticias.push(result.data[i]);
					StorageService.set('noticias',$scope.noticias);
					StorageService.set('noticias-paging',$scope.noticias);
				}

				$scope.paging = result.paging;

				if ( result.paging.actual_page == result.paging.total_pages  ) {
					$scope.items_disponiveis = false;
				}

				$scope.$broadcast('scroll.infiniteScrollComplete');
				paged++;
			} else {
				$scope.noticias = StorageService.get('noticias');
				$scope.paging = StorageService.get('noticias-paging');
				$scope.items_disponiveis = false;
			}
		});
	}
});