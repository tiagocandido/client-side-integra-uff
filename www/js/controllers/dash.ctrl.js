function DashCtrl($scope, $ionicLoading, $state) {
    $scope.$on("NOT_AUTHENTICATED", function () {
        console.log('CAPTUROUUUUUUUUUU!!!');
        $state.transitionTo('tab.accounts');
    });

    $scope.$on("SYNC_START", function () {
        console.log('COMECOUUUUUUUUUUUUUU!!!');
        $ionicLoading.show({
            templateUrl: 'templates/syncing.html'
        });
    });

    $scope.$on("SYNC_STOP", function () {
        console.log('COMECOUUUUUUUUUUUUUU!!!');
        $ionicLoading.hide();
    });
}