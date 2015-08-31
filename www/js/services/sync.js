function Sync($q, Authentication, Accounts,  Courses, Events, Topics, Files){
  const RESOURCES = [Events, Courses, Topics, Files];

  var fetchAll = function(){
    return RESOURCES.map(function(resource){
      return resource.fetch();
    });
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
        return accounts.map(function(account){
          return sync(account)
        })
      });
      return $q.all(requests);
    }
  };
}
