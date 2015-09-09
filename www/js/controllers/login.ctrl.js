function LoginCtrl($scope, $state, $ionicPopup, $ionicLoading, Authentication, Accounts, Sync) {
  $scope.$on('$ionicView.beforeEnter', function() {
    Accounts.hasAccount().then(function(hasAccount){
      if(hasAccount) {
        $state.go('tab.settings').then(function(){
          $state.go('tab.accounts')
        });
      }
    })
  });

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
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Autenticação falhou',
            template: 'Usuário e/ou senha inválido(s)'
          });
        });
  }
}