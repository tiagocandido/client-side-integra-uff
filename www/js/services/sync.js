function Sync($q, Authentication, Accounts,  Courses, Events, Topics, Files){
  const RESOURCES = [Events, Courses, Topics, Files];

  var fetchAll = function(){
    var resources = [];
    angular.forEach(RESOURCES, function(resource){
      resources.push(resource.fetch());
    });
    return resources;
  };

  var reAuthenticate = function(system){
    return Accounts.getCredentials(system)
        .then(function(credentials){
          return Authentication.login(system, credentials)
        })
  };

  var sync = function(account){
    Authentication.isTokenValid(account.system).then(function(valid) {
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


  return {
    hasSyncedAccount: function(){
      return Accounts.hasAccount();
    },
    run: function(){
      var requests = Accounts.all().then(function(accounts){
        var fetched = [];
        angular.forEach(accounts, function(account){
          fetched.push(sync(account));
        });
        return fetched;
      });
      return $q.all(requests);
    }
  };
}
