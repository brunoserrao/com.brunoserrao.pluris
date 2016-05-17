angular.module('http.services', [])

.factory('RequestService', function($http, $timeout, $ionicLoading){
    var timeout = 10000;

    $ionicLoading.show();

    var urlApi = 'https://demo.wp-api.org/wp-json/wp/v2';

    function request(method,endPoint, data, callback) {
        $http({
            method: method, 
            data: data, 
            url: urlApi + '/' + endPoint,
            timeout: timeout
        }).then(
            function successCallback(response){
                if (callback) {
                    callback(response.data)
                }
            },
            function errorCallback(response){
                alert('erro ' + response.status);
            }
        ).finally(
            function acabei(){
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
            }
        )
    }

    return {
        request : request
    }
});