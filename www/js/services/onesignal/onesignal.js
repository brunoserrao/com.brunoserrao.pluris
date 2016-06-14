angular.module('onesignal.services', [])

.factory('OneSingalService', function($ionicPlatform, $state, $rootScope, StorageService){

    var init = function(){
        notificacoes = StorageService.get('notificacoes');

        if (!notificacoes) {
            notificacoes = [];
            StorageService.set('notificacoes', notificacoes);
        }
        
        if (typeof ionic.Platform.device().available !== 'undefined') {
            window.plugins.OneSignal.init("b69e6a23-9185-43f4-9746-17886415f661",{googleProjectNumber: "749121535538"}, additionalData);
            window.plugins.OneSignal.enableInAppAlertNotification(true);
            window.plugins.OneSignal.enableNotificationsWhenActive(false);
        }

        // for (var id_teste = 0; id_teste < 10; id_teste++) {
        //     jsonData = {"message": id_teste + " - Mensagem em Português","additionalData":{"redirect":"app.programacao/id","id": id_teste,"title":"Titulo em Português 13/06/2016 16:53:39"},"isActive":false};
        //     additionalData(jsonData);   
        // }
    }

    var additionalData = function(jsonData) {
        notificacoes = StorageService.get('notificacoes');
        notificacoes.reverse();
        notificacoes.push(jsonData);
        StorageService.set('notificacoes',  notificacoes);
        $rootScope.contador = notificacoes.length;

        if (Object.keys(jsonData.additionalData).length) {
            if (!jsonData.isActive) {
                $state.go(jsonData.additionalData.redirect,{ 'id' : jsonData.additionalData.id });
            }
        }
    }

    var subscribe = function(subscribe){
        window.plugins.OneSignal.setSubscription(subscribe);
    }

    return {
        init : init,
        subscribe : subscribe
    }
})
.directive('notificacaoContador', function(){
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            contador : '='
        },
        templateUrl: 'templates/contador/contador.html',
        controller: function($scope, $state, $ionicListDelegate, $rootScope, $ionicPopover, $timeout, StorageService){

            $scope.notificacoes = StorageService.get('notificacoes');
            $scope.contador = $scope.notificacoes.length;

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
                $scope.deletarNotificacao(index);
            }

            $scope.deletarNotificacao = function(index, notificacao){
                $scope.notificacoes.splice(index,1);
                $scope.contador = $scope.notificacoes.length;

                $timeout(function(){
                    StorageService.set('notificacoes', $scope.notificacoes);
                },100)
            }
        }
    }
});