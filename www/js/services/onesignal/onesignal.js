angular.module('onesignal.services', [])

.factory('OneSignalService', function($rootScope, $timeout, $ionicPlatform, $state, StorageService){

    $ionicPlatform.ready(function () {
        if (typeof ionic.Platform.device().available !== 'undefined') {
            window.plugins.OneSignal.init("b69e6a23-9185-43f4-9746-17886415f661",{googleProjectNumber: "749121535538"}, additionalData);
            window.plugins.OneSignal.enableInAppAlertNotification(false);
            window.plugins.OneSignal.enableNotificationsWhenActive(false);
        }
    });

    var init = function(){
        notificacoes = StorageService.get('notificacoes');

        if (!notificacoes) {
            notificacoes = [];
            StorageService.set('notificacoes', notificacoes);
        }

        // for (var id_teste = 0; id_teste < 10; id_teste++) {
        //     jsonData = {"message": id_teste + " - Mensagem em Português","additionalData":{"redirect":"app.programacao/id","id": id_teste,"title":"Titulo em Português 13/06/2016 16:53:39"},"isActive":false};
        //     additionalData(jsonData);   
        // }
    }

    var additionalData = function(jsonData) {
        notificacoes = StorageService.get('notificacoes');
        notificacoes.push(jsonData);
        StorageService.set('notificacoes',  notificacoes);

        // if (Object.keys(jsonData.additionalData).length) {
        //     if (!jsonData.isActive) {
        //         $state.go(jsonData.additionalData.redirect,{ 'id' : jsonData.additionalData.id });
        //     }
        // }

        $timeout(function(){
            $rootScope.$broadcast("broadcastNotificationReceiver");
        },500);
    }

    var subscribe = function(subscribe){
        window.plugins.OneSignal.setSubscription(subscribe);
    }

    return {
        init : init,
        subscribe : subscribe
    }
})