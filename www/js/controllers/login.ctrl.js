function LoginCtrl($scope, $state, Authentication, Sync) {
  $scope.credentials = {};
  $scope.login = function(){
    Authentication.login($scope.credentials)
        .then(function(){
          $scope.notice = "Sincronizando dados";
          Sync.run().then(function(){
            $state.transitionTo('tab.dash');
          });
        });
  }
}
