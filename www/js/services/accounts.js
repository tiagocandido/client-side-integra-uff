function Accounts($q, DB) {
  var self = this;

  self.hasAccount = function(){
    var deferred = $q.defer();
    self.all().then(function(result){
      deferred.resolve(!!result.length);
    });
    return deferred.promise;
  };

  self.all = function() {
    return DB.selectAll('accounts')
        .then(function(result){
          return result;
        });
  };

  self.getToken = function(system) {
    return DB.select('accounts', {'system' : system }).then(function(result){
      return result.length ? result[0].token : undefined;
    })
  };

  self.create = function(system, login, password, token){
    return self.accountExists(system, login).then(function(exists){
      if(exists){
        return DB.update('accounts', {'password' : password, 'token' : token}, { 'system' : {
          "value" : system,
          "union" : 'AND'
        } , 'login' : login} );
      }
      else{
        return DB.insert('accounts', { 'system' : system, 'login' : login, 'password' : password, 'token' : token});
      }
    });
  };

  self.accountExists = function(system, login){
    var deferred = $q.defer();
    DB.select('accounts', { 'system' : {
      "value" : system,
      "union" : 'AND'
    } , 'login' : login}).then(function(result){
      deferred.resolve(!!result.length)
    });
    return deferred.promise;
  };

  return self;
}