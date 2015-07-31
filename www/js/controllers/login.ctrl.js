function LoginCtrl($scope, $state, $ionicLoading, Authentication, Sync) {
  $scope.login = function(){
    Authentication.login($scope.credentials)
        .then(function(){
          startSyncing();
          Sync.run().then(function(){
            stopSyncing();
            $state.transitionTo('tab.dash');
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
  }
}
