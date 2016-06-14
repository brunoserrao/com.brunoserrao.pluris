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
        controller: function($scope, $state, $ionicPopover, $timeout, StorageService){
            $scope.notificacoes = StorageService.get('notificacoes');

            if ($scope.notificacoes) {
                $scope.notificacoes.reverse();
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
            }

            $scope.deletarNotificacao = function(index, notificacao){
                $scope.notificacoes.splice(index,1);
                $scope.contador = $scope.notificacoes.length;
                StorageService.set('notificacoes', $scope.notificacoes);
            }
        }
    }
});