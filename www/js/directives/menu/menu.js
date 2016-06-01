angular.module('menuDirective', [])
.directive('menuDirective', function(){
	return {
		restrict: 'E',
		scope: {
			title: '@',
			categories: '=',
			categoryState: '@' // default: FALSE
		},
		replace: false,
		templateUrl: 'templates/menu/menu-directive.html',
		controller: ['$scope','$translate','$ionicSideMenuDelegate',function($scope, $translate, $ionicSideMenuDelegate) {
			$scope.displaySubMenu = function(menu){
				console.log(menu);
			};

			$scope.hasSubMenu = function(menu){
				return menu.items ? true : false;
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
							href : '#/app/pagina/125'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_PROGRAMACAO'),
							href : '#/app/pagina/127'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_PUBLICACAO'),
							href : '#/app/pagina/131'
						},
						{
							title : $translate.instant('MENU_CONGRESSO_CONTATOS'),
							href : '#/app/pagina/129'
						}
					]
				},
				{
					title : $translate.instant('MENU_LOCAL'),
					ionClass : 'ion-ios-location-outline',
					items : [
						{
							title : $translate.instant('MENU_LOCAL_CIDADE'),
							href : '#/app/pagina/133'
						},
						{
							title : $translate.instant('MENU_LOCAL_CONFERENCIA'),
							href : '#/app/pagina/135'
						}
					]
				},
				{
					title : $translate.instant('MENU_NOTICIAS'),
					ionClass : 'ion-ios-paper-outline',
					href : '#/app/noticias'
				},
				{
					title : $translate.instant('MENU_IDIOMAS_CONFIG'),
					ionClass : 'ion-ios-world-outline',
					href : '#/app/config'
				}
			];
		}]
	}
});