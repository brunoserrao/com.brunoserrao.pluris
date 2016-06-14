'use strict';
angular.module('starter', ['ionic', 'starter.controllers', 'pascalprecht.translate', 'ngCookies','ngCordova','menuDirective','notificacaoDirective','ui.rCalendar'])

.run(function ($ionicPlatform, $timeout) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		if (navigator.splashscreen) {
			$timeout(function() {
				navigator.splashscreen.hide();
			}, 2000);
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
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				}
			}
		})

		.state('app.noticias', {
			url: '/noticias',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/noticias/index.html',
					controller: 'NoticiasController'
				}
			}
		})

		.state('app.noticias/id', {
			url: '/noticia/:id',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/noticias/noticia.html',
					controller: 'NoticiasViewController'
				}
			}
		})

		.state('app.apresentacao', {
			url: '/pagina/:id',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/paginas/pagina.html',
					controller: 'PaginasController'
				}
			}
		})

		.state('app.programacao', {
			url: '/programacao',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/programacao/programacao.html',
					controller: 'ProgramacaoController'
				}
			}
		})

		.state('app.programacao/id', {
			url: '/programacao/:id',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/programacao/evento.html',
					controller: 'ProgramacaoViewController'
				}
			}
		})

		.state('app.configuracao', {
			url: '/configuracao',
			cache: false,
			views: {
				menuContent: {
					templateUrl: 'templates/configuracao/configuracao.html',
					controller: 'ConfiguracaoController'
				}
			}
		})
	
	$urlRouterProvider.otherwise('/app/home');
});