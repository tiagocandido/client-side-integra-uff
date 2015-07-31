function ConexaoUffInterceptor($q, Accounts){
  return {
    request : function(config){
      var deferred = $q.defer();
      if(config.url.indexOf('api/conexao_uff/')!= -1){
        Accounts.getToken('conexao_uff').then(function(token){
          console.log(token);
          if (token) {
            if(!config.params) config.params = {};
            config.params.token = token;
          }
          deferred.resolve(config);
        });
      }
      else{
        deferred.resolve(config);
      }
      return deferred.promise;
    }
  }
}
