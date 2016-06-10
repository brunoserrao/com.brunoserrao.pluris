angular.module('onesignal.services', [])

.factory('OneSingalService', function($ionicPlatform, $state){

    var init = function(){
        if (typeof ionic.Platform.device().available !== 'undefined') {
            window.plugins.OneSignal.init("b69e6a23-9185-43f4-9746-17886415f661",{googleProjectNumber: "749121535538"}, additionalData);
            window.plugins.OneSignal.enableNotificationsWhenActive(true);
        }
    }

    var additionalData = function(jsonData) {
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
});