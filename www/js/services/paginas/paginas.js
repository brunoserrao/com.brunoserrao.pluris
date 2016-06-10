angular.module('paginas.services', [])

.factory('PaginasService', function(RequestService){
    
    function pagina(id, loading, callback) {
        RequestService.request('GET','/pagina/' + id, false, loading, function(result){
            callback(result);
        });
    }

    return {
        pagina : pagina
    }
});