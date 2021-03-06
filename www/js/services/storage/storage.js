angular.module('storage.services', ['LocalStorageModule'])

.config(function(localStorageServiceProvider){
    localStorageServiceProvider
        .setPrefix('pluris-2016')
        .setNotify(true, true);
})

.factory('StorageService', function(localStorageService){

    var set = function (key, data) {
        return localStorageService.set(key, data);
    }

    var get = function (key) {
        return localStorageService.get(key);
    }
    
    var remove = function (keys) {
        return localStorageService.remove(keys);
    }

    var clear = function(){
        return localStorageService.clearAll();
    }
    
    return {
        set: set,
        get: get,
        remove: remove,
        clear : clear
    }
});