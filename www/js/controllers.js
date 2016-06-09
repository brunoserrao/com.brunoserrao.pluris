'use strict';
angular.module('starter.controllers', ['http.services','popup.services','share.services','noticias.services','paginas.services','eventos.services','toast.services','storage.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $translate, $translateLocalStorage, ShareService) {

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
})
.filter('externalLinks', function($sce, $sanitize) {
	return function(text) {
		var regex = /href="([\S]+)"/g;
		var newString = $sanitize(text).replace(regex, "href= \"#\" onclick=\"window.open('$1', '_blank', 'location=yes')\"");
		return $sce.trustAsHtml(newString);
	}
 });