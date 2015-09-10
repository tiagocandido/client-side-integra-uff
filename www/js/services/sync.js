function Sync($interval, $rootScope, $q, Settings, Authentication, Accounts,  Courses, Events, Topics, Files){
  var clock = null;

  const RESOURCES = [Events, Courses, Topics, Files];


  var deleteAll = function(system){
    angular.forEach(RESOURCES, function(resource){
      resource.delete({ 'system' : system })
    })
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
    var deffered = $q.defer();
    $rootScope.$broadcast('SYNC_START');
    Accounts.all().then(function (accounts) {
      var promises = [];
      if (accounts.length) {
        angular.forEach(accounts, function (account) {
          promises.push(prepare(account));
        });
        $q.all(promises).then(function(){
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
      deleteAll(system)
    }
  }
}
