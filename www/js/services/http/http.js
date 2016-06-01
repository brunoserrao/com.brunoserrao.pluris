angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translate, $translateLocalStorage, PopupService, ToastService){
    var timeout = 10000;

    function request(method,end_point, data, loading, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var concat = end_point.indexOf('?') > 1 ? '&' : '/?';
        var api = 'http://10.0.0.108/pluris2016.fundepes.br/wp-json/api/v1' + end_point + concat + 'lang=' + lang;


        if (loading) {
            $ionicLoading.show({
                 showBackdrop: false,
                 class: 'royal'
            });
        }

        $http({
            method: method, 
            data: data, 
            url: api,
            timeout: timeout,
            cache: true
        }).then(
            function successCallback(response){
                if (callback) {
                    callback(response.data)
                }
            },
            function errorCallback(response){
                var errorMessage = $translate.instant('ERRO_SERVIDOR') + ' : COD ' + response.status;
                
                ToastService.message(errorMessage);

                if (typeof ionic.Platform.device().available !== 'undefined'){
                    $timeout(function(){
                        window.analytics.trackException(errorMessage, true);
                    },500);
                }
                
                if (callback) {
                    callback();
                }
            }
        ).finally(
            function itsOver(){
                if (loading) {
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 500);
                }
            }
        )
    }

    return {
        request : request
    }
});