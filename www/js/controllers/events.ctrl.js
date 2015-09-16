function EventsCtrl($scope, $cordovaCalendar, $ionicPopup, Events) {
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
  });

  $scope.addToCalendar = function(_event) {
    $cordovaCalendar.createEvent({
      title: _event.name,
      notes: _event.info,
      startDate: _event.starts,
      endDate: _event.ends
    }).then(function (result) {
      console.log("Deu bom");
      $ionicPopup.alert({
        title: 'Evento adicionado',
        template: 'O evento ' + _event.name + ' foi adicionado ao calendário com sucesso.'
      });
    }, function (err) {
      $ionicPopup.alert({
        title: 'Falha',
        template: 'Erro: ' + err
      });
    });
  };
}
