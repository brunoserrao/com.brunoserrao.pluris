angular.module('starter.controllers').controller('ProgramacaoController', function($scope, $ionicPopover, $stateParams, RequestService, StorageService){

	$ionicPopover.fromTemplateUrl('templates/popover/popover.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};

	$scope.carregarProgramacao = function(loading) {
		RequestService.request('GET','/eventos',null, loading, function(result){
			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					console.log(result.data[i]);
				}

				// console.log(result.data.length);

				// $scope.programacao = result.data;
				// StorageService.set('programacao-eventos',result.data.pagina.data);
			} else {
				$scope.programacao = StorageService.get('programacao-eventos');
			}

			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.calendar = {};

	$scope.changeMode = function (mode) {
		$scope.calendar.mode = mode;
		$scope.popover.hide();
	};

	$scope.loadEvents = function () {
		$scope.calendar.eventSource = createRandomEvents();
	};

	$scope.onEventSelected = function (event) {
		console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
	};

	$scope.onViewTitleChanged = function (title) {
		$scope.viewTitle = title;
	};

	$scope.today = function () {
		$scope.calendar.currentDate = new Date();
		$scope.popover.hide();
	};

	$scope.isToday = function () {
		var today = new Date(),
		currentCalendarDate = new Date($scope.calendar.currentDate);

		today.setHours(0, 0, 0, 0);
		currentCalendarDate.setHours(0, 0, 0, 0);
		return today.getTime() === currentCalendarDate.getTime();
	};

	$scope.onTimeSelected = function (selectedTime) {
		console.log('Selected time: ' + selectedTime);
	};
});