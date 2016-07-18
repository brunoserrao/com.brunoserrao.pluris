'use strict';
angular.module('starter.controllers')
.controller('UsuarioController', function($rootScope, $scope, $timeout, $translate, $state, StorageService, RequestService, ToastService){

	$scope.login = function(){
		var data = {
			username : formLogin.username.value,
			password : formLogin.password.value
		}

		RequestService.request('POST','/validar',data , true, function(result){
			if (result) {
				$rootScope.user = result.data.usuario;
				StorageService.set('user', $rootScope.user);
			} else {
				console.log($translate.instant('FORM_LOGIN_FALHA'));
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}

	$scope.logout = function(){
		RequestService.request('GET','/logout',null , true, function(result){
			if (result) {
				delete $rootScope.user;
				StorageService.remove('user');
			} else {
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}
});