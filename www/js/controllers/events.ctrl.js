function EventsCtrl($scope, Events) {
  Events.all().then(function(events){
    $scope.events = events
  });
}