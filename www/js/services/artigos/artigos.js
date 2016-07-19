angular.module('artigos.services', [])

.factory('ArtigosService', function(RequestService){
    
    function artigos(paged,loading, callback) {
       RequestService.request('GET','/artigos/?paged=' + paged, false, loading, function(result){
            callback(result)
        });
    }

    function artigo(id, loading, callback) {
        RequestService.request('GET','/artigos/' + id, false, loading, function(result){
            callback(result)
        });
    }

    return {
        artigos : artigos,
        artigo : artigo
    }
});