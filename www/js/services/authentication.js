function Authentication($http, Accounts){
  const autenticationPath = '/api/conexao_uff/login';
  var self = {
    login: function(credentials){
      return $http
          .post(autenticationPath, credentials)
          .then(function(response){
            Accounts.create('conexao_uff', credentials.login, credentials.password, response.data.token);
          })
    }
  };
  return self;
}