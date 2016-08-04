'use strict';
angular.module('starter.controllers')
.controller('ContatoController', function($rootScope, $scope, $translate, $state, RequestService, ToastService){

	$scope.enviado = false;

	$scope.contato = function(){
		if(!$scope.user){
			$state.go('app.usuario/login');
			return;
		}

		var data = {
			assunto : formContato.assunto.value,
			mensagem : formContato.mensagem.value
		}

		RequestService.request('POST','/contato',data , true, function(result){
			if (result) {
				$scope.enviado = true;
				formContato.assunto.value = '';
				formContato.mensagem.value = '';
			} else {
				ToastService.message($translate.instant('FORM_LOGIN_FALHA'));
			}
		});
	}

	$scope.reiniciar = function(){
		$scope.enviado = false;
	}
});