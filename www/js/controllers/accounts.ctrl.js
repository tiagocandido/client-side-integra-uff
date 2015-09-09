function AccountsCtrl($scope, $ionicLoading, Authentication, Accounts) {
  $scope.showButtons = false;
  $scope.$on('$ionicView.beforeEnter', function() {
    Accounts.hasAccount().then(function(hasAccount){
      $scope.authenticated = hasAccount;
      $scope.showButtons = true;
    })
  });

  $scope.logout = function(){
    console.log("chamou");
    $ionicLoading.show({
      templateUrl: 'templates/signing_out.html'
    });
    Authentication.logout('conexao_uff').then(function(){
      $ionicLoading.hide();
      $scope.authenticated = false;
    }, function(){
      $ionicLoading.hide();
    });
  }
}