angular.module('notificacaoDirective', [])
.directive('notificacaoDirective', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            contador : '=',
            notificacoes : '='
        },
        templateUrl: 'templates/contador/contador.html',
        controller: function($scope, $timeout, $state, $ionicPopover, $ionicPlatform, $cordovaNativeAudio, StorageService){
            $ionicPlatform.ready(function() {
                if( window.plugins && window.plugins.NativeAudio ) {
                    window.plugins.NativeAudio.preloadSimple( 'notificacao', 'sounds/notificacao.mp3');
                }
            })

            $scope.notificacoes = StorageService.get('notificacoes');

            if ($scope.notificacoes) {
                $scope.contador = $scope.notificacoes.length;
            }
            
            $ionicPopover.fromTemplateUrl('templates/popover/notificacoes.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            $scope.openPopover = function($event) {
                $scope.popover.show($event);
            };

            $scope.clickNotificacao = function(notificacao, index){
                $state.go(notificacao.additionalData.redirect,{ 'id' : notificacao.additionalData.id });
                $scope.popover.hide();
                $scope.deletarNotificacao(notificacao, index);
            }

            $scope.deletarNotificacao = function(notificacao, index){
                $scope.notificacoes.splice(index,1);
                StorageService.set('notificacoes', $scope.notificacoes);
                
                $timeout(function(){
                    $scope.$broadcast("broadcastNotificationReceiver");
                },500);
            }

            $scope.$on("broadcastNotificationReceiver", function (event, args) {
                window.plugins.NativeAudio.play( 'notificacao' );
                $scope.notificacoes = StorageService.get('notificacoes');
                $scope.contador = $scope.notificacoes.length;
            });
        }
    }
});