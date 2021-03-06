function ConexaoUffInterceptor($q, Accounts){
  return {
    request : function(config){
      var deferred = $q.defer();
      if(config.url.indexOf('conexao_uff')!= -1 && config.url.indexOf('login') == -1){
        Accounts.getToken('conexao_uff').then(function(token){
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
