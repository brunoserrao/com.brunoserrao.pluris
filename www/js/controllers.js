'use strict';
angular.module('starter.controllers', ['http.services','popup.services','share.services','noticias.services','artigos.services','foruns.services','paginas.services','eventos.services','toast.services','storage.services','onesignal.services'])

.controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $timeout, $translate, $translateLocalStorage, $ionicPlatform, $ionicSideMenuDelegate, $state, $ionicHistory, ShareService, OneSignalService, StorageService, RequestService) {

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
	$scope.closeLogin = function() {
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
			$ionicSideMenuDelegate.toggleLeft();
		} else {
			if ($ionicHistory.currentView().index > 0) {
				$ionicHistory.goBack(-1);
			} else {
				$ionicSideMenuDelegate.toggleLeft();
			}
		}
	}, 100);
})

.filter('externalLinks', function($sce, $sanitize) {
	return function(text) {
		var regex = /href="([\S]+)"/g;
		var newString = $sanitize(text).replace(regex, "href= \"#\" onclick=\"window.open('$1', '_blank', 'location=yes')\"");
		return $sce.trustAsHtml(newString);
	}
 });