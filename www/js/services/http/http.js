angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translate, $translateLocalStorage, PopupService, ToastService, StorageService){
    var timeout = 15000;

    function request(method,end_point, data, loading, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var concat = '';

        if (method == 'GET') {
            concat = end_point.indexOf('?') > 1 ? '&' : '/?' + 'lang=' + lang;
            end_point = end_point + concat;
        }

        var api = 'http://10.0.0.200/pluris2016.fundepes.br/wp-json/api/v1' + end_point;
        
        var user = StorageService.get('user');
        var headers = new Headers();

        if (loading) {
            $ionicLoading.show({
                 showBackdrop: false
            });
        }

        var httpOptions = {
            method: method,
            data: data, 
            url: api,
            timeout: timeout,
            cache: false
        }

        if (user) {
             $http.defaults.headers.common['Authorization'] = "Basic " + user.hash;
        }

        $http(httpOptions).then(
            function successCallback(response){
                if (callback) {
                    callback(response.data)
                }
            },
            function errorCallback(response){
                var errorMessage = $translate.instant('ERRO_SERVIDOR') + ' : ' + response.status;
                
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
        ).finally(function(){
            $timeout(function () {
                $ionicLoading.hide();
            }, 500);
        })
    }

    return {
        request : request
    }
});