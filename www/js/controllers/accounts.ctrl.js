function AccountsCtrl($scope, $ionicLoading, Authentication, Accounts, Sync) {
  $scope.showButtons = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    Accounts.hasAccount().then(function(hasAccount){
      $scope.authenticated = hasAccount;
      $scope.showButtons = true;
    })
  });

  $scope.logout = function(){
    $ionicLoading.show({
      templateUrl: 'templates/signing_out.html'
    });
    Authentication.logout('conexao_uff').then(function(){
      Sync.unsync('conexao_uff');
      $ionicLoading.hide();
      $scope.authenticated = false;
    }, function(){
      $ionicLoading.hide();
    });
  }
}