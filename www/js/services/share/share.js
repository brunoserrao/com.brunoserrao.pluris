angular.module('share.services', [])

.factory('ShareService', function($translate, $cordovaSocialSharing){
    function share(post) {
        var files = [];

        if (post.thumbnail){
            files.push(post.thumbnail);
        } else {
            files.push('www/img/share.jpg');
        }

        var options = {
            message: post.post_title,
            subject: post.post_excerpt,
            files: files,
            chooserTitle: $translate.instant('CONGRESSO')
        }

        if (post.link){
            options.url = post.link
        }

        var onSuccess = function(result) {

        }

        var onError = function(msg) {
            console.log(msg);
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }

    return {
        share : share
    }
});