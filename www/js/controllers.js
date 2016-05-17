angular.module('starter.controllers', ['http.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $translate, $translateLocalStorage) {

	$scope.language = 'pt_BR';

	// Set Language
	$scope.switchLanguage = function (key) {
		$translate.use(key);
		$scope.language = key;
	};

	// get Language
	$scope.getLanguage = function () {
		return $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
	};
});