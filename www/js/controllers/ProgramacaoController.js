'use strict';
angular.module('starter.controllers').controller('ProgramacaoController', function($scope, $stateParams, EventosService, StorageService){
	$scope.aba_ativa = 1;
	$scope.eventos = [];
	$scope.descricao = '';

	$scope.carregarProgramacao = function(dia ,loading) {
		EventosService.eventos(dia, loading, function(result){
			if (result) {
				$scope.eventos = result.data;
				StorageService.set('programacao-eventos-'+dia,$scope.eventos);
				StorageService.set('programacao-eventos-descricao-'+dia,$scope.eventos);
				$scope.descricao = result.descricao;
			} else {
				$scope.eventos = StorageService.get('programacao-eventos-'+dia);
				$scope.descriao = StorageService.get('eventos-descriao-'+dia);
			}

			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	$scope.carregarDia = function(dia){
		$scope.eventos = [];
		$scope.aba_ativa = dia;
		$scope.carregarProgramacao(dia, true)
	}
});