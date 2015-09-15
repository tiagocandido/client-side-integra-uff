function EventsCtrl($scope, Events) {
  $scope.init = function() {
    Events.all().then(function(events){
      var time_now = new Date().toISOString();
      var next_events = [];
      var previous_events = [];

      angular.forEach(events,function(_event){
        if(_event.ends > time_now){
          next_events.push(_event);
        } else {
          previous_events.push(_event);
        }
      });

      $scope.next_events = next_events;
      $scope.previous_events = previous_events;
    })
  };

  $scope.$on("SYNC_STOP", function(){
    $scope.init();
  });

  $scope.init();
}
