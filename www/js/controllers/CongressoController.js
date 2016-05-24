angular.module('starter.controllers').controller('CongressoController', ['$scope','RequestService', function($scope, RequestService, $cordovaSocialSharing){
	RequestService.request('GET','/pagina/2',null,function(result){
		if (result) {
			$scope.apresentacao = result.data;
		}
	});

	$scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
    }
}]);