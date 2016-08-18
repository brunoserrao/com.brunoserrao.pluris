'use strict';
angular.module('starter.controllers')
.controller('UsuarioController', function($rootScope, $scope, $translate, $state, $ionicHistory, $ionicSideMenuDelegate, StorageService, RequestService, ToastService){

	$scope.doLogin = function(){
		var data = {
			username : formLogin.username.value,
			password : formLogin.password.value
		}

		RequestService.request('POST','/validar',data , true, function(result){
			if (result) {
				$scope.setUser(result);
				formLogin.reset();
				$scope.closeLogin();
				ToastService.message($translate.instant('FORM_LOGIN_OK',{nome : result.data.usuario.display_name}));
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
				StorageService.clear();

				$state.go('app.home');
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
				formCadastro.reset();
			} else {
				ToastService.message($translate.instant('FORM_CADASTRO_FALHA'));
			}
		});
	}

	$scope.setUser = function(result){
		$rootScope.user = result.data.usuario;
		StorageService.set('user', $rootScope.user);

		$ionicHistory.nextViewOptions({
			disableBack: true
		});
	}

	$scope.recuperar = false;
	$scope.emailData = {}
		
	$scope.recuperarSenha = function(){
		var data = {
			username : formRecuperarSenha.username.value
		}

		RequestService.request('POST','/recuperar-senha',data , true, function(result){
			if (result) {
				$scope.recuperar = true;
				$scope.emailData = {
					email : result.data
				};
			} else {
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}

	$scope.closeMenu = function(){
		if ($ionicSideMenuDelegate.isOpen()) {
			$ionicSideMenuDelegate.toggleLeft();
		}
	}

	$scope.goBack = function(){
		$ionicHistory.goBack(-1);
	}
});