'use strict';
angular.module('menuDirective', [])
.directive('menuDirective', function(){
	return {
		restrict: 'E',
		scope: {
			title: '@',
			state: '@'
		},
		replace: false,
		templateUrl: 'templates/menu/menu-directive.html',
		controller: function($scope, $translate, $location) {

			var state = $scope.state || false;

			$scope.isActive = function(menu) {
				if (menu.href && $location.path().indexOf(menu.href) !== -1) {
					return 'active';
				} else if (state && $state.includes(state) && $stateParams.id == menu.id) {
					return 'active';
				}
			}

			$scope.toggleCat = function(menu){
				if ($scope.isCatShown(menu)) {
					$scope.activeCat = null;
				} else {
					$scope.activeCat = menu;
				}

				$scope.activeSubCat = null;
			};

			$scope.isCatShown = function(menu) {
				return $scope.activeCat === menu;
			};

			$scope.hasSubMenu = function(menu){
				return menu.items ? true : false;
			};

			$scope.toggleSubCat = function(menu) {
				if ($scope.isSubCatShown(menu)) {
					$scope.activeSubCat = null;
				} else {
					$scope.activeSubCat = menu;
				}
			};

			$scope.isSubCatShown = function(menu) {
				return $scope.activeSubCat === menu;
			};
			
			$scope.menus = [
				{
					title : $translate.instant('MENU_HOME'),
					ionClass : 'ion-ios-home-outline',
					href : '#/app/home',
				},
				{
					title : $translate.instant('MENU_CONGRESSO'),
					ionClass : 'ion-ios-people-outline',
					items : [
						{
							title : $translate.instant('MENU_CONGRESSO_APRESENTACAO'),
							href : '#/app/pagina/2'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_ORGANIZACAO'),
							href : '#/app/pagina/151'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_PROGRAMACAO'),
							href : '#/app/programacao'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_PUBLICACAO'),
							href : '#/app/pagina/229'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_CONTATOS'),
							href : '#/app/pagina/231'
						}
					]
				},
				{
					title : $translate.instant('MENU_LOCAL'),
					ionClass : 'ion-ios-location-outline',
					items : [
						{
							title : $translate.instant('MENU_LOCAL_CIDADE'),
							href : '#/app/pagina/233'
						},
						{
							title : $translate.instant('MENU_LOCAL_CONFERENCIA'),
							href : '#/app/pagina/235'
						}
					]
				},
				{
					title : $translate.instant('MENU_NOTICIAS'),
					ionClass : 'ion-ios-paper-outline',
					href : '#/app/noticias'
				},
				{
					title : $translate.instant('MENU_ANAIS'),
					ionClass : 'ion-ios-copy-outline',
					href : '#/app/artigos',
				},
				{
					title : $translate.instant('MENU_GALERIA'),
					ionClass : 'ion-ios-camera-outline',
					href : '#/app/galeria',
				},
				{
					title : $translate.instant('MENU_FORUNS'),
					ionClass : 'ion-ios-chatboxes-outline',
					href : '#/app/foruns',
				},
				{
					title : $translate.instant('MENU_AGENDA_CULTURAL'),
					ionClass : 'ion-ios-film-outline',
					href : '#/app/pagina/257'
				},
				{
					title : $translate.instant('MENU_IDIOMAS_CONFIG'),
					ionClass : 'ion-ios-world-outline',
					href : '#/app/configuracao'
				},
				{
					title : $translate.instant('MENU_FALE_CONOSCO'),
					ionClass : 'ion-ios-email-outline',
					href : '#/app/contato'
				}
			];
		}
	}
});