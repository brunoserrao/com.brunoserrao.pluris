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
		if (navigator.splashscreen) {
			setTimeout(function() {
				navigator.splashscreen.hide();
			}, 100);
		}

		if (typeof ionic.Platform.device().available !== 'undefined') {
			// Enable to debug issues.
			// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
			var notificationOpenedCallback = function(jsonData) {
				console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
			};

			window.plugins.OneSignal.init("b69e6a23-9185-43f4-9746-17886415f661",{googleProjectNumber: "749121535538"},notificationOpenedCallback);
			// Show an alert box if a notification comes in when the user is in your app.
			// window.plugins.OneSignal.enableInAppAlertNotification(true);
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

	$translateProvider
		.useStaticFilesLoader({
			prefix: 'locales/',
			suffix: '.json'
		})
		.registerAvailableLanguageKeys(['en', 'es', 'pb'], {
			'en_*': 'en',
			'es_*': 'es',
			'pt_*': 'pb'
		})
		.preferredLanguage('pb')
		.fallbackLanguage('pb')
		.determinePreferredLanguage('pb')
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
				menuContent: {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				}
			}
		})

		.state('app.noticias', {
			url: '/noticia/:id',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/noticias/noticia.html',
					controller: 'NoticiasController',
					method : 'noticia'
				}
			}
		})

		.state('app.apresentacao', {
			url: '/congresso/apresentacao',
			views: {
				menuContent: {
					templateUrl: 'templates/congresso/apresentacao.html',
					controller: 'CongressoController',
					method : 'apresentacao'
				}
			}
		})

		.state('app.organizacao', {
			url: '/congresso/organizacao',
			views: {
				menuContent: {
					templateUrl: 'templates/congresso/organizacao.html',
					controller: 'CongressoController',
					method : 'organizacao'
				}
			}
		});
	
	$urlRouterProvider.otherwise('/app/home');
});