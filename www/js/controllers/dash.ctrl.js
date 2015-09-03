function DashCtrl($scope, $ionicLoading, $state) {
    $scope.$on("NOT_AUTHENTICATED", function () {
        $state.transitionTo('tab.accounts');
    });

    $scope.$on("SYNC_START", function () {
        $ionicLoading.show({
            templateUrl: 'templates/syncing.html'
        });
    });

    $scope.$on("SYNC_STOP", function () {
        $ionicLoading.hide();
    });
}