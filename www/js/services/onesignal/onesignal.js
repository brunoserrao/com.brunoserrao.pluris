angular.module('onesignal.services', [])

.factory('OneSingalService', function($ionicPlatform, $state, $rootScope, StorageService){

    var init = function(){
        $rootScope.contador = StorageService.get('contador');

        if (typeof ionic.Platform.device().available !== 'undefined') {
            window.plugins.OneSignal.init("b69e6a23-9185-43f4-9746-17886415f661",{googleProjectNumber: "749121535538"}, additionalData);
            window.plugins.OneSignal.enableInAppAlertNotification(true);
            window.plugins.OneSignal.enableNotificationsWhenActive(false);
        }
    }

    var additionalData = function(jsonData) {
        $rootScope.contador++;
        StorageService.set('contador',  $rootScope.contador);

        if (Object.keys(jsonData.additionalData).length) {
            if (!jsonData.isActive) {
                $state.go(jsonData.additionalData.redirect,{ 'id' : jsonData.additionalData.id });
            }
        }
    }

    var subscribe = function(subscribe){
        window.plugins.OneSignal.setSubscription(subscribe);
    }

    return {
        init : init,
        alert : alert,
        subscribe : subscribe
    }
})
.directive('notificacaoContador', function(){
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            contador : '='
        },
        templateUrl: 'templates/contador/contador.html',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(){
                scope.alertar();
            });
        },
        controller: function($scope,$rootScope, $timeout, $cordovaNativeAudio, StorageService){
            $scope.alertar = function($scope){
                alert('mostrar popover');
                
                if (typeof ionic.Platform.device().available !== 'undefined') {
                    $cordovaNativeAudio.play('bongo');
                }

                $timeout(function(){
                    $rootScope.contador = 0;
                    StorageService.set('contador',  $rootScope.contador);
                },100);
            }
        }
    }
});