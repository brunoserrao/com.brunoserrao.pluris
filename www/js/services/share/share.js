angular.module('share.services', [])

.factory('ShareService', function($translate, $cordovaSocialSharing){
    function share(post) {
        var options = {
            message: post.post_title,
            subject: post.post_excerpt,
            files: ['www/img/share.png'],
            url: post.link,
            chooserTitle: $translate.instant('CONGRESSO')
        }

        var onSuccess = function(result) {
            console.log("Share completed? " + result.completed);
            console.log("Shared to app: " + result.app);
        }

        var onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }

    return {
        share : share
    }
});