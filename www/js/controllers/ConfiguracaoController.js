'use strict';
angular.module('starter.controllers')
.controller('ConfiguracaoController', function($scope, $timeout, $window, $translate, $translateLocalStorage, $ionicLoading){

	$scope.init = function(){
		$scope.language = $scope.getLanguage();
	}

	// Set Language
	$scope.switchLanguage = function (key) {
		$ionicLoading.show();

		$translate.use(key);
		$scope.language = key;

		$timeout(function(){
			$window.location.reload(true);
			$ionicLoading.hide();
		},1000);
	};

	// get Language
	$scope.getLanguage = function () {
		return $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
	};
});