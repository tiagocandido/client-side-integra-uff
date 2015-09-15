function MainCtrl($scope, $rootScope, $ionicLoading, $state) {
  $scope.$on("NOT_AUTHENTICATED", function () {
    $state.go('tab.settings').then(function(){
      $state.go('tab.accounts')
    });
  });

  $scope.$on("SYNC_START", function () {
    console.log("SYNC_START");
    $ionicLoading.show({
      templateUrl: 'templates/syncing.html'
    });
  });

  $scope.$on("SYNC_STOP", function () {
    console.log("SYNC_STOP");
    $ionicLoading.hide();
  });
}