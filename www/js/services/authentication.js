function Authentication($http, Accounts){
  return  {
    login: function(system, credentials){
      var loginPath = 'https://integra-uff.herokuapp.com/' + system + '/authentication/login';
      return $http.post(loginPath, credentials)
          .then(function(response){
            return Accounts.create('conexao_uff', credentials.login, credentials.password, response.data.token)
          })
    },
    logout: function(system){
      return Accounts.getToken(system).then(function(token){
        var logoutPath = 'https://integra-uff.herokuapp.com/' + system + '/authentication/logout';
        return $http({
          url: logoutPath,
          method: "GET",
          params: { token: token }
        })
            .then(function(response){
              return Accounts.delete(system).then(function(){
                return response.data.signed_out;
              });
            });
      })
    },
    isTokenValid : function(system){
      var tokenValidationPath = 'https://integra-uff.herokuapp.com/' + system + '/authentication/validation';
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