angular.module('eventos.services', [])

.factory('EventosService', function(RequestService){
    
    function eventos(paged,loading, callback) {
       RequestService.request('GET','/eventos', false, loading, function(result){
            callback(result)
        });
    }

    function evento(id, loading, callback) {
        RequestService.request('GET','/eventos/' + id, false, loading, function(result){
            callback(result)
        });
    }

    return {
        eventos : eventos,
        evento : evento
    }
});