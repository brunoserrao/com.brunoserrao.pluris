angular.module('toast.services', [])

.factory('ToastService', function($timeout, $cordovaToast){

    function message(message){
        if (typeof ionic.Platform.device().available !== 'undefined') {
            $cordovaToast
                .show(message, 'long', 'bottom')
                .then(function(success) {
                    console.log('success: ' + success);
                }, function (error) {
                    console.log('error: ' + error);
            });
        } else {
            console.log(message);
        }
    }
    
    return {
        message : message
    }
});