function EventsCtrl($scope, Events) {
  $scope.events = Events.all();
  $scope.remove = function(_event) {
    Events.remove(_event);
  }
};