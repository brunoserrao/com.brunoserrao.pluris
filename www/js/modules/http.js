angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading, $translateLocalStorage, PopupService){
    var timeout = 10000;


    function request(method,endPoint, data, callback) {
        var lang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        var urlApi = 'https://pluris2016.fundepes.br/wp-json/wp/v2/' + endPoint + '?lang=' + lang;

        $ionicLoading.show({
             showBackdrop: false
        });
        
        // if(window.Connection) {
            $http({
                method: method, 
                data: data, 
                url: urlApi,
                timeout: timeout
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
                    }, 2000);
                }
            )
        // }
    }

    return {
        request : request
    }
});