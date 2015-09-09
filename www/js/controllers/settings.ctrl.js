function SettingsCtrl($scope, Sync, Settings) {
  $scope.intervalOptions = [
    { interval: '30000', text: '30 segundos' },
    { interval: '900000', text: '15 minutos' },
    { interval: '1800000', text: '30 minutos' },
    { interval: '3600000', text: '1 hora' },
    { interval: '21600000', text: '6 horas' },
    { interval: '43200000', text: '12 horas' },
    { interval: '86400000', text: '1 dia' }
  ];

  Settings.getAllSettings().then(function(settings){
    console.log(JSON.stringify(settings));
    var _settings = {};
    angular.forEach(settings, function(setting){
      _settings[setting.name] = {type : setting.type, value : setting.value};
    });

    $scope.settings = _settings;

    $scope.$watch('settings', function(newSettings, oldSettings){
      for(var prop in newSettings){
        if(newSettings.hasOwnProperty(prop) && newSettings[prop].value != oldSettings[prop].value){
          Settings.setSetting(prop, newSettings[prop].value, true);
          if(prop == 'SYNC_INTERVAL'){
            Sync.stop();
            Sync.start(newSettings[prop].value);
          }
        }
      }
    }, true);
  });


}