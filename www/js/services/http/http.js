angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translate, $translateLocalStorage, PopupService, ToastService, StorageService){
    var timeout = 15000;

    function request(method,end_point, data, loading, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var concat = end_point.indexOf('?') > 1 ? '&lang=' + lang : '/?lang=' + lang;
        var api = 'https://pluris2016.fundepes.br/wp-json/api/v1' + end_point + concat;

        var user = StorageService.get('user');

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
                if (response.status == 500) {
                    var errorMessage = $translate.instant('ERRO_SERVIDOR') + ' : ' + response.status;
                    ToastService.message(errorMessage);
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