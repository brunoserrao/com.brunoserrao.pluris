angular.module('starter.controllers')
.controller('NoticiasController', function($scope, $timeout, $ionicScrollDelegate, NoticiasService){
	paged = 1;
	$scope.items_disponiveis = true;
	$scope.noticias = [];

	$scope.carregar_noticias = function(){
		NoticiasService.noticias(paged,function(result){

			for (var i = 0; i < result.data.length; i++) {
				$scope.noticias.push(result.data[i]);
			}
			// $scope.noticias.push(result.data);
			$scope.paging = result.paging;

			if ( result.paging.actual_page == result.paging.total_pages  ) {
				$scope.items_disponiveis = false;
			}

			$scope.$broadcast('scroll.infiniteScrollComplete');
			paged++;
		});
	}

	// NoticiasService.noticia(84,function(result){
	// 	console.log(result);
	// });
});