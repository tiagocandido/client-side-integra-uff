function Accounts(DB) {
  var self = this;

  self.hasAccount = function(){
    return self.all().then(function(result){
      return !!result.length
    });
  };

  self.all = function() {
    return DB.selectAll('accounts')
  };

  self.delete = function(system){
    return DB.delete('accounts', { 'system' : system })
  };

  self.getToken = function(system) {
    return DB.select('accounts', {'system' : system }).then(function(result){
      return result.length ? result[0].token : undefined;
    })
  };

  self.create = function(system, login, password, token){
    return DB.insert('accounts', { 'system' : system, 'login' : login, 'password' : password, 'token' : token}, true);
  };

  self.getCredentials = function(system){
    return DB.select('accounts', {'system' : system }).then(function(result){
      var credentials = {}, account;
      if(result.length){
        account = result[0];
        credentials =  { login : account.login, password: account.password }
      }
      return credentials
    })
  };

  return self;
}
