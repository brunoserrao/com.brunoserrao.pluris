'use strict';
angular.module('starter.controllers').controller('LocalController', function($scope, $timeout, $ionicActionSheet, PaginasService, StorageService, ToastService, ShareService){
	$scope.latitude = -9.641546;
	$scope.longitude = -35.698683

	$scope.carregarPagina = function(loading){
		PaginasService.pagina(235, loading, function(result){
			if (result) {
				$scope.pagina = result.data;
				StorageService.set('local', $scope.pagina);
			} else {
				$scope.pagina = StorageService.get('local');
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},500)
		});
	}

	$scope.abrirAppMapa = function(coordenadas, imovel){
		try{
			launchnavigator.availableApps(function(results){
				var lnButtons = [];
				var lnApps = [];
				var appLauncher;
				
				for(var app in results){
					if (results[app]) {
						lnButtons.push({
							text : launchnavigator.getAppDisplayName(app)
						});

						lnApps.push(app)
					}
				}

				$ionicActionSheet.show({
					buttons: lnButtons,
					titleText: 'Selecione o aplicativo',
					cancelText: 'Cancelar',
					cancel: function() {
						
					},
					buttonClicked: function(index) {
						switch(lnApps[index].toUpperCase()){
							case 'GOOGLE_MAPS' :
								appLauncher = launchnavigator.APP.GOOGLE_MAPS;
							break;

							case 'WAZE' :
								appLauncher = launchnavigator.APP.WAZE;
							break;

							case 'CITYMAPPER' :
								appLauncher = launchnavigator.APP.CITYMAPPER;
							break;

							case 'UBER' :
								appLauncher = launchnavigator.APP.UBER;
							break;

							case 'APPLE_MAPS' :
								appLauncher = launchnavigator.APP.APPLE_MAPS;
							break;

							case 'NAVIGON' :
								appLauncher = launchnavigator.APP.NAVIGON;
							break;

							case 'TRANSIT_APP' :
								appLauncher = launchnavigator.APP.TRANSIT_APP;
							break;

							case 'YANDEX' :
								appLauncher = launchnavigator.APP.YANDEX;
							break;

							case 'TOMTOM' :
								appLauncher = launchnavigator.APP.TOMTOM;
							break;

							case 'BING_MAPS' :
								appLauncher = launchnavigator.APP.BING_MAPS;
							break;

							case 'SYGIC' :
								appLauncher = launchnavigator.APP.SYGIC;
							break;

							case 'HERE_MAPS' :
								appLauncher = launchnavigator.APP.HERE_MAPS;
							break;

							case 'MOOVIT' :
								appLauncher = launchnavigator.APP.MOOVIT;
							break;

							default:
								appLauncher = launchnavigator.APP.GOOGLE_MAPS;
							break;
						}
						
						launchnavigator.navigate([$scope.latitude,$scope.longitude], {
							app: appLauncher,
							transportMode: launchnavigator.TRANSPORT_MODE.DRIVING,
							launchMode: 'turn-by-turn'
						});

						return true;
					}
				});
			});
		}catch(exception){
			ToastService.message(exception.message)
		}
	}
});