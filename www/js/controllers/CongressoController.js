angular.module('starter.controllers').controller('CongressoController', function($scope, $translate, $stateParams, RequestService){
	RequestService.request('GET','/pagina/2',null,function(result){
		if (result) {
			$scope.apresentacao = result.data;
		}
	});
});