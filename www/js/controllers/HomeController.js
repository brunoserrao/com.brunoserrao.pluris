angular.module('starter.controllers')
.controller('HomeController', ['$scope','RequestService', function($scope, RequestService){
	RequestService.request('get','posts',null,function(data){
		$scope.homeNews = data;
	});
}]);