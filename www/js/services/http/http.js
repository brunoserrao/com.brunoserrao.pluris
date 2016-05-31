angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translate, $translateLocalStorage, PopupService, ToastService){
    var timeout = 10000;

    function request(method,end_point, data, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var concat = end_point.indexOf('?') > 1 ? '&' : '/?';
        var api = 'http://10.0.0.108/pluris2016.fundepes.br/wp-json/api/v1' + end_point + concat + 'lang=' + lang;

        $ionicLoading.show({
             showBackdrop: false,
             class: 'royal'
        });

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
                ToastService.message($translate.instant('ERRO_SERVIDOR') + ' : COD ' + response.status);
                if (callback) {
                    callback()
                }
            }
        ).finally(
            function itsOver(){
                $timeout(function () {
                    $ionicLoading.hide();
                }, 500);
            }
        )
    }

    return {
        request : request
    }
});