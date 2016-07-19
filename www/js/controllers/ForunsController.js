'use strict';
angular.module('starter.controllers')
.controller('ForunsController', function($rootScope, $scope, $timeout, $stateParams, $translate, $ionicModal, ForunsService, StorageService, ToastService){
	$scope.paged = 1;
	$scope.items_disponiveis = true;
	$scope.foruns = [];
	$scope.comentarios = [];

	$ionicModal.fromTemplateUrl('templates/foruns/form-comentario.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		if(!$scope.user){
			$state.go('app.usuario/login')
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
		ForunsService.foruns($scope.paged, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.foruns.push(result.data[i]);
				}
				
				StorageService.set('foruns',$scope.foruns);
				StorageService.set('foruns-paging',$scope.paging);

				$scope.paging = result.paging;
			} else {
				$scope.foruns = StorageService.get('Foruns');
				$scope.paging = StorageService.get('Foruns-paging');
				$scope.items_disponiveis = false;
			}
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