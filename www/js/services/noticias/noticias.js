angular.module('noticias.services', [])

.factory('NoticiasService', function(RequestService){
    
    function noticias(paged,callback) {
       RequestService.request('GET','/noticias/?paged=' + paged,null,function(result){
            callback(result)
        });
    }

    function noticia(id, callback) {
        RequestService.request('GET','/noticias/' + id,null,function(result){
            callback(result)
        });
    }

    return {
        noticias : noticias,
        noticia : noticia
    }
});