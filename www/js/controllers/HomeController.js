angular.module('starter.controllers')
.controller('HomeController', function($scope, RequestService, StorageService){
	
	$scope.atualizarHome = function(loading) {
		RequestService.request('GET','/home',null, loading, function(result){
			if (result) {
				$scope.pagina = result.data.pagina.data;
				$scope.noticias = result.data.noticias.data;
				
				StorageService.set('apresentacao-home',result.data.pagina.data);
				StorageService.set('noticias-home',result.data.noticias.data);
			} else {
				$scope.pagina = StorageService.get('apresentacao-home');
				$scope.noticias = StorageService.get('noticias-home');
			}

			$scope.$broadcast('scroll.refreshComplete');
		});
	};
});