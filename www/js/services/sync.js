function Sync($interval, $rootScope, $cordovaNetwork, $q, Settings, Authentication, Accounts,  Courses, Events, Topics, Files){
  var clock = null;

  const RESOURCES = [Events, Courses, Topics, Files];


  var deleteAll = function(system){
    var promises = [];
    angular.forEach(RESOURCES, function(resource){
      promises.push(resource.delete({ 'system' : system }))
    });
    return $q.all(promises);
  };

  var fetchAll = function(){
    var resources = [];
    Settings.getSetting('LAST_SYNC').then(function(lastSync) {
      params = typeof lastSync == 'undefined' ? {} : { last_sync: lastSync };
      angular.forEach(RESOURCES, function (resource) {
        resources.push(resource.fetch(params));
      });
    });
    return $q.all(resources);
  };

  var reAuthenticate = function(system){
    return Accounts.getCredentials(system)
        .then(function(credentials){
          return Authentication.login(system, credentials)
        })
  };

  var prepare = function(account){
    return Authentication.isTokenValid(account.system).then(function(valid) {
      if (valid) {
        return fetchAll();
      }
      else {
        return reAuthenticate(account.system).then(function () {
          return fetchAll();
        })
      }
    })
  };

  var sync = function(){
    var deffered = $q.defer(),
        connectionType = $cordovaNetwork.getNetwork();
    console.log("Connection type" + connectionType);
    if (connectionType != Connection.NONE) {
      $rootScope.$broadcast('SYNC_START');
      Accounts.all().then(function (accounts) {
        var promises = [];
        if (accounts.length) {
          angular.forEach(accounts, function (account) {
            promises.push(prepare(account));
          });
          $q.all(promises).then(function(){
            var date = new Date();
            Settings.setSetting('LAST_SYNC', date.toISOString(), true);
            $rootScope.$broadcast('SYNC_STOP');
            deffered.resolve();
          }, function(){
            deffered.reject();
          })
        }
        else {
          $rootScope.$broadcast('NOT_AUTHENTICATED');
          $rootScope.$broadcast('SYNC_STOP');
          deffered.resolve();
        }
      });
    }
    else {
      deffered.resolve("No Connection Available");
    }
    return deffered.promise;
  };


  return {
    now: function(){
      return sync();
    },
    start: function(interval){
      sync();
      if(clock === null){
        clock = $interval(sync, interval);
      }
    },
    stop: function(){
      if(clock !== null){
        $interval.cancel(sync);
        clock = null;
      }
    },
    unsync: function(system){
      deleteAll(system).then(function(){
        Settings.deleteSetting('LAST_SYNC');
        $rootScope.$broadcast('SYNC_STOP');
      })
    }
  }
}
