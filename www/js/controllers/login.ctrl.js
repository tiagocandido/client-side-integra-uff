function LoginCtrl($scope, $state, $ionicPopup, $ionicLoading, Authentication, Sync) {
  $scope.credentials = {};
  $scope.login = function(){
    $ionicLoading.show({
        templateUrl: 'templates/authenticating.html'
    });
    Authentication.login('conexao_uff', $scope.credentials)
        .then(function(){
          $ionicLoading.hide();
          Sync.now().then(function(){
            $state.transitionTo('tab.dash');
          });
        }, function(){
          $ionicPopup.alert({
            title: 'Autenticação falhou',
            template: 'Usuário e/ou senha inválido(s)'
          });
        });
  }
}