'use strict';
angular.module('starter.controllers')
.controller('ForunsController', function($rootScope, $scope, $timeout, $state, $stateParams, $translate, $ionicModal, ForunsService, StorageService, ToastService){
	
	$ionicModal.fromTemplateUrl('templates/foruns/form-comentario.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		if(!$scope.user){
			$scope.login();
		} else {
			$scope.modal.show();
		}
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.carregarForuns = function(loading){
		$scope.paged = 1;
		$scope.items_disponiveis = true;
		$scope.foruns = [];
		$scope.comentarios = [];

		ForunsService.foruns($scope.paged, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.foruns.push(result.data[i]);
				}
				
				$scope.descricao = result.descricao;
				StorageService.set('foruns',$scope.foruns);
				StorageService.set('foruns-descricao',$scope.descricao);
			} else {
				$scope.foruns = StorageService.get('Foruns');
				$scope.descriao = StorageService.get('foruns-descriao');
				$scope.items_disponiveis = false;
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			}, 500);
		});
	}

	$scope.carregarForum = function(loading){
		var id = $stateParams.id;
		
		ForunsService.forum(id, loading, function(result){
			if (result) {
				$scope.forum = result.data[0];
				$scope.comentarios = result.comentarios;

				StorageService.set('forum-' + id, $scope.forum);
				StorageService.set('forum-comentarios-' + id, $scope.forum);
			} else {
				$scope.forum = StorageService.get('forum-' + id);
				$scope.comentarios = StorageService.get('forum-comentarios-' + id);
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}

	$scope.comentar = function(loading){
		var id = $stateParams.id;
		
		var data = {
			"id" : id,
			"comentario" : formComentario.comentario.value.replace(/\n/g,"<br>")
		}
		
		ForunsService.comentar(id, data, loading, function(result){
			if (result) {
				$scope.carregarForum(true);
				formComentario.comentario.value = '';
				
				$timeout(function(){
					$scope.closeModal();
				},500);
			} else {
				ToastService.message($translate.instant('ERRO_AO_ENVIAR_COMENTARIO'));
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}
});