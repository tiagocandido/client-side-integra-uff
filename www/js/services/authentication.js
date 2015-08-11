function Authentication($http, Accounts){
  return  {
    login: function(system, credentials){
      var loginPath = 'api/' + system + '/authentication/login';
      return $http
          .post(loginPath, credentials)
          .then(function(response){
            return Accounts.create('conexao_uff', credentials.login, credentials.password, response.data.token)
          })
    },
    isTokenValid : function(system){
      var tokenValidationPath = 'api/' + system + '/authentication/validation';
      return Accounts.getToken(system).then(function(token){
        return $http({
          url: tokenValidationPath,
          method: "GET",
          params: { token: token }
        })
        .then(function(response){
          return response.data.valid;
        });
      })
    }
  };
}