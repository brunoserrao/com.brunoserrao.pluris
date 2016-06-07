angular.module('btbackfunc.services', [])

.factory('btbackfunc', function($ionicPlatform){
	
	btbackfunc = function(){
		// $ionicPlatform.registerBackButtonAction(function (event) {
		// 	console.log(event)
		// },100);
	}

	return {
		btbackfunc : btbackfunc
	}
});