angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translateLocalStorage, PopupService){
    var timeout = 10000;

    function request(method,end_point, data, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var concat = end_point.indexOf('?') > 1 ? '&' : '/?';
        var urlApi = 'http://10.0.0.111/pluris2016.fundepes.br/wp-json/api/v1' + end_point + concat + 'lang=' + lang;

        $ionicLoading.show({
             showBackdrop: false,
             class: 'royal'
        });
        
        // if(window.Connection) {
            $http({
                method: method, 
                data: data, 
                url: urlApi,
                timeout: timeout,
                cache: true
            }).then(
                function successCallback(response){
                    if (callback) {
                        callback(response.data)
                    }
                },
                function errorCallback(response){
                   PopupService.alert(response.status);
                }
            ).finally(
                function acabei(){
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 500);
                }
            )
        // }
    }

    return {
        request : request
    }
});