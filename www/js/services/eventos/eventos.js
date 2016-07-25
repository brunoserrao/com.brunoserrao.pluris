angular.module('eventos.services', [])

.factory('EventosService', function(RequestService){
    
    function eventos(day,loading, callback) {
        data = {
            day : day
        };
        
        RequestService.request('POST','/eventos', data, loading, function(result){
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