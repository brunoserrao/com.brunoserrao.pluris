'use strict';
angular.module('starter.controllers')
.controller('GaleriaController', function($rootScope, $scope, $timeout, $ionicModal, $cordovaCamera, $state, StorageService, RequestService, ToastService){

	$scope.items = [];
	$scope.status = false;
	$scope.imgURI = "img/camera-placeholder.jpg";

	$ionicModal.fromTemplateUrl('templates/galeria/foto.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		if(!$scope.user){
			$state.go('app.usuario/login')
		} else {
			$scope.modal.show();
		}
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.carregarGaleria = function(loading, callback) {
		RequestService.request('GET','/galeria',null, loading, function(result){
			if (result) {
				$scope.items = result.data.fotos;
				$scope.titulo =  result.data.titulo;
				$scope.texto =  result.data.texto;

				StorageService.set('galeria-result',result);
			} else {
				galeria_result = StorageService.get('galeria-result');

				if (galeria_result) {
					$scope.items = galeria_result.data.fotos;
					$scope.titulo =  galeria_result.data.titulo;
					$scope.texto =  galeria_result.data.texto
				}
			}

			$timeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			}, 500);

			if(callback){
				callback();
			}
		});
	}

	$scope.upload = function(){
		var data = {
			image : $scope.imgURI,
			title : myForm.title.value
		}

		RequestService.request('POST','/galeria/upload', data, true, function(result){
			if(result){
				$scope.carregarGaleria(true, function(){
					$scope.closeModal();
					$scope.reset();
				});
			} else {
				ToastService.message('Erro ao enviar a foto');
			}
		});
	}

	$scope.reset = function(){
		$scope.imgURI = "img/camera-placeholder.jpg";
		$scope.status = false;
	}

	if (navigator.camera) {
		$scope.takePhoto = function(source){
			var source_type = source == 1 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;

			$scope.options = {
				quality: 75,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: source_type,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 600,
				targetHeight: 600,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: true,
				correctOrientation: true
			}

			$cordovaCamera.getPicture($scope.options).then(onSuccess, onFail);

			function onSuccess (imageData) {
				$scope.imgURI = "data:image/jpeg;base64," + imageData;
				$scope.status = true;
			}
			
			function onFail(err) {
				ToastService.message(err);
			}
		}
	}
});