function LoginCtrl($scope, $state, $ionicLoading, $ionicPopup, Authentication, Sync) {
  $scope.credentials = {};
  $scope.login = function(){
    Authentication.login('conexao_uff', $scope.credentials)
        .then(function(){
          startSyncing();
          Sync.run().then(function(){
            stopSyncing();
            $state.transitionTo('tab.dash');
          });
        }, function(){
          $ionicPopup.alert({
            title: 'Autenticação falhou',
            template: 'Usuário e/ou senha inválido(s)'
          });
        });
  };

  var startSyncing = function(){
    $ionicLoading.show({
      templateUrl: 'templates/syncing.html'
    });
  };

  var stopSyncing = function(){
    $ionicLoading.hide();
  };
}
