angular.module('toast.services', [])

.factory('ToastService', function($timeout, $cordovaToast){

    function message(message){
        if (typeof ionic.Platform.device().available !== 'undefined') {
            $cordovaToast.show(message, 'long', 'bottom');
        } else {
            console.log(message);
        }
    }
    
    return {
        message : message
    }
});