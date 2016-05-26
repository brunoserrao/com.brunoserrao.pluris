angular.module('paginas.services', [])

.factory('PaginasService', function(RequestService){
    

    function pagina(id, callback) {
        RequestService.request('GET','/pagina/' + id,null,function(result){
            if (result) {
                callback(result);
            }
        });
    }

    return {
        pagina : pagina
    }
});