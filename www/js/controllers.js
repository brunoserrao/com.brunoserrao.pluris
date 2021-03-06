'use strict';
angular.module('starter.controllers', ['http.services','popup.services','share.services','noticias.services','artigos.services','foruns.services','paginas.services','eventos.services','toast.services','storage.services','onesignal.services','popup.services'])

.controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $timeout, $translate, $translateLocalStorage, $ionicPlatform, $ionicSideMenuDelegate, $state, $ionicHistory, ShareService, OneSignalService, StorageService, RequestService, PopupService) {

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/usuario/login.html', {
		scope: $scope,
		animation: 'slide-in-up'
		}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function(go) {
		if (go){
			$state.go(go).then(function() {
				if ($ionicSideMenuDelegate.isOpen()) {
					$ionicSideMenuDelegate.toggleLeft();
				}

				$timeout(function(){
					$scope.modal.hide();
				},500)
			});
		} else {
			$scope.modal.hide();
		}

		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	// Share function
	$scope.share = function(post) {
		ShareService.share(post);
	}

	// Google Analytics
	if (typeof ionic.Platform.device().available !== 'undefined'){
		window.analytics.startTrackerWithId('UA-77647694-2');
	}

	// Google Analytics TrackView
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if (typeof ionic.Platform.device().available !== 'undefined'){
			$timeout(function(){
				window.analytics.trackView(window.location.hash);
			},500);
		}
	});

	// User
	$rootScope.user = StorageService.get('user');

	// OneSignal Init
	OneSignalService.init();

	// Hardware Back Button
	$ionicPlatform.registerBackButtonAction(function () {
		if($state.current.name=='app.home'){
			var data = {
				template : $translate.instant('MENSAGEM_CONFIRMAR_SAIR')
			}

			PopupService.confirm(data, function(res){
				if (res) {
					ionic.Platform.exitApp();
				}
			})
		} else {
			if ($ionicHistory.currentView().index > 0) {
				$ionicHistory.goBack(-1);
			} else {
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('app.home');
			}
		}
	}, 100);
})

.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
})

.filter('externalLinks', function($sce, $sanitize) {
	return function(text) {
		var regex = /href="([\S]+)"/g;
		var newString = $sanitize(text).replace(regex, "href= \"#\" onclick=\"window.open('$1', '_blank', 'location=yes')\"");
		return $sce.trustAsHtml(newString);
	}
 })

.filter('externalLinksSystem', function($sce, $sanitize) {
	return function(text) {
		var regex = /href="([\S]+)"/g;
		var newString = $sanitize(text).replace(regex, "href= \"#\" class=\"button button-full button-royal button-download\"  onclick=\"window.open('$1', '_system', 'location=yes')\"");
		return $sce.trustAsHtml(newString);
	}
 });