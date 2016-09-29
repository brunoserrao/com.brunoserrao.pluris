angular.module('popup.services', [])

.factory('PopupService', function($timeout, $ionicPopup, $translate){

	var alert = function(content, callback) {
		$ionicPopup.alert({
			title: $translate.instant('ALERTA_TITULO'),
			content: $translate.instant(content),
			subTitle: $translate.instant('CONGRESSO'),
			okText: "OK",
			okType: 'button-royal'
		}).then(function(res) {
			if (callback) {
				callback(res);
			}
		});
	}

	var confirm = function(data, callback) {
		$ionicPopup.confirm({
			title: $translate.instant('ALERTA_TITULO'),
			template: data.template,
			cancelText : $translate.instant('POPUP_BOTAO_CANCELAR'),
			okText : $translate.instant('POPUP_BOTAO_CONFIRMAR'),
			okType: 'button-royal'
		}).then(function(res) {
			 if (callback) {
				callback(res);
			}
		});
	}

	return {
		alert : alert,
		confirm : confirm,
	}
});