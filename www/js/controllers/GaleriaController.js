'use strict';
angular.module('starter.controllers')
.controller('GaleriaController', function($scope, $timeout, StorageService, RequestService){
	
	$scope.items = [];

	$scope.carregarGaleria = function(loading) {
		RequestService.request('GET','/galeria',null, loading, function(result){
			if (result) {
				$scope.items = result.data.fotos;
				$scope.titulo =  result.data.titulo;
				$scope.texto =  result.data.texto;

				StorageService.set('galeria-result',result);
			} else {
				galeria_result = StorageService.get('galeria-result');

				if (galeria_result) {
					$scope.items = galeria_result.data.fotos;
					$scope.titulo =  galeria_result.data.titulo;
					$scope.texto =  galeria_result.data.texto
				}
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			}, 500);
		});
	}
});