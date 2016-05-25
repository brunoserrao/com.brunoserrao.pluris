angular.module('popup.services', [])

.factory('PopupService', function($timeout, $ionicPopup, $translate){

    function alert(content, callback) {
        $timeout(function () {
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
        }, 500);
    }

    return {
        alert : alert
    }
});