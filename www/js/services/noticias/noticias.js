angular.module('noticias.services', [])

.factory('NoticiasService', function(RequestService){
    
    function noticias(paged,loading, callback) {
       RequestService.request('GET','/noticias/?paged=' + paged, false, loading, function(result){
            callback(result)
        });
    }

    function noticia(id, loading, callback) {
        RequestService.request('GET','/noticias/' + id, false, loading, function(result){
            callback(result)
        });
    }

    return {
        noticias : noticias,
        noticia : noticia
    }
});