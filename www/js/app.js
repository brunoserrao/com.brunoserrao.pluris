// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'pascalprecht.translate', 'ngCookies'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		// hide splashscreen
		setTimeout(function() {
	        navigator.splashscreen.hide();
		}, 100);
	});
})

.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

	$translateProvider
		.useStaticFilesLoader({
			prefix: 'locales/',
			suffix: '.json'
		})
		.registerAvailableLanguageKeys(['en', 'es', 'pt_BR'], {
			'en': 'en',
			'en_US': 'en ',
			'en_UK': 'en',
			'es': 'es',
			'pt': 'pt_BR',
			'pt_BR': 'pt_BR'
		})
		.preferredLanguage('pt_BR')
		.fallbackLanguage('pt_BR')
		.determinePreferredLanguage()
		.useSanitizeValueStrategy('escapeParameters')
		.useLocalStorage();

	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})

		.state('app.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				}
			}
		})

		.state('app.apresentacao', {
			url: '/congresso/apresentacao',
			views: {
				'menuContent': {
					templateUrl: 'templates/congresso/apresentacao.html',
					controller: 'CongressoController',
					'method' : 'apresentacao'
				}
			}
		});
	
	$urlRouterProvider.otherwise('/app/home');
});