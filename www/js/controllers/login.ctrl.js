function LoginCtrl($scope, $state, $ionicPopup, Authentication, Sync) {
  $scope.credentials = {};
  $scope.login = function(){
    Authentication.login('conexao_uff', $scope.credentials)
        .then(function(){
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