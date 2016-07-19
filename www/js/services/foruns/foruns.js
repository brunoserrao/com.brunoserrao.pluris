angular.module('foruns.services', [])

.factory('ForunsService', function(RequestService){
    
    function foruns(paged,loading, callback) {
       RequestService.request('GET','/foruns/?paged=' + paged, false, loading, function(result){
            callback(result)
        });
    }

    function forum(id, loading, callback) {
        RequestService.request('GET','/foruns/' + id, false, loading, function(result){
            callback(result)
        });
    }

    return {
        foruns : foruns,
        forum : forum
    }
});