function SettingsCtrl($scope, Sync, Settings) {
  $scope.settings = {};

  Settings.getSetting('SYNC_INTERVAL').then(function(value){
    $scope.settings.SYNC_INTERVAL = value;
  });

  $scope.$watchCollection('settings', function(newSettings, oldSettings){
    for(var prop in newSettings){
      if(newSettings.hasOwnProperty(prop) && parseInt(newSettings[prop]) != oldSettings[prop]){
        Settings.setSetting(prop, newSettings[prop], true);
        if(prop == 'SYNC_INTERVAL'){
          Sync.stop();
          Sync.start(newSettings[prop]);
        }
      }
    }
  });
}