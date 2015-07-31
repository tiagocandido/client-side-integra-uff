function Authentication($http, $q, Accounts){
  const autenticationPath = '/api/conexao_uff/login';
  var self = {
    login: function(credentials){
      return $http
          .post(autenticationPath, credentials)
          .then(function(response){
            var deferred = $q.defer();
            Accounts.create('conexao_uff', credentials.login, credentials.password, response.data.token).then(function(result){
              deferred.resolve(result);
            });
            return deferred.promise;
          })
    }
  };
  return self;
}