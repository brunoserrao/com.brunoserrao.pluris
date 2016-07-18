'use strict';
angular.module('starter.controllers')
.controller('UsuarioController', function($rootScope, $scope, $translate, $state, $ionicHistory, StorageService, RequestService, ToastService){

	$scope.login = function(){
		var data = {
			username : formLogin.username.value,
			password : formLogin.password.value
		}

		RequestService.request('POST','/validar',data , true, function(result){
			if (result) {
				$scope.setUser(result);
			} else {
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}

	$scope.logout = function(){
		RequestService.request('GET','/logout',null , true, function(result){
			if (result) {
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				
				delete $rootScope.user;
				StorageService.remove('user');

				$state.go('app.usuario/login');
			} else {
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}

	$scope.cadastro = function(){
		var data = {
			name : formCadastro.name.value,
			email : formCadastro.email.value,
			password : formCadastro.password.value
		}

		RequestService.request('POST','/cadastro',data , true, function(result){
			if (result) {
				$scope.setUser(result);
			} else {
				ToastService.message($translate.instant('FORM_CADASTRO_FALHA'));
			}
		});
	}

	$scope.setUser = function(result){
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		
		$rootScope.user = result.data.usuario;
		StorageService.set('user', $rootScope.user);
		$state.go('app.home');
	}
});