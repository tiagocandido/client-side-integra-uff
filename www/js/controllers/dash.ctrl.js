function DashCtrl($scope, $state, Sync) {
  $scope.$on('$ionicView.enter', function() {
    Sync.hasSyncedAccount().then(function(hasAccount){
      if(hasAccount) Sync.run(); else $state.transitionTo('tab.sync');
    })
  });
}