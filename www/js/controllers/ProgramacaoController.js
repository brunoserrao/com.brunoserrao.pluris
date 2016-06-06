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

			$scope.calendar.events = [];

			if (result) {
				for (var i = 0; i < result.data.length; i++) {
					date_start = new Date(result.data[i].metas.date_start[0] + 'T' + result.data[i].metas.time_start[0]);
					date_end = new Date(result.data[i].metas.date_end[0] + 'T' + result.data[i].metas.time_end[0]);

					evento = {
						id: result.data[i].ID,
						title: result.data[i].post_title,
						startTime: date_start,
						endTime: date_end,
						allDay: false
					};

					$scope.calendar.events.push(evento);
				}

				StorageService.set('programacao-eventos',$scope.calendar.events);
			} else {
				scope.calendar.events = StorageService.get('programacao-eventos');
			}

			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.calendar = {};

	$scope.changeMode = function (mode) {
		$scope.calendar.mode = mode;
		$scope.popover.hide();
	};

	// $scope.onEventSelected = function (evento) {
	// 	console.log('Event selected:' + event.id);
	// };

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