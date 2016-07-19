'use strict';
angular.module('starter.controllers')
.controller('ForunsController', function($scope, $timeout, $stateParams, ForunsService, StorageService){
	$scope.paged = 1;
	$scope.items_disponiveis = true;
	$scope.foruns = [];

	$scope.carregarForuns = function(loading){
		ForunsService.foruns($scope.paged, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					$scope.foruns.push(result.data[i]);
				}
				
				StorageService.set('foruns',$scope.foruns);
				StorageService.set('foruns-paging',$scope.paging);

				$scope.paging = result.paging;

				if ( result.paging.actual_page == result.paging.total_pages  ) {
					$scope.items_disponiveis = false;
				} else {
					$scope.paged = result.paging.actual_page + 1;
				}

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
				StorageService.set('forum-' + id, $scope.forum);
			} else {
				$scope.forum = StorageService.get('forum-' + id);
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}

	$scope.comentar = function(loading){
		var id = $stateParams.id;
		
		console.log(id);
	}
});