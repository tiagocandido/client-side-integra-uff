function Files($http, DB) {
  var self = {
    all: function() {
      return DB.selectAll('files');
    },
    create: function(file_attributes){
      return DB.insert('files', file_attributes, true)
    },
    fetch: function(){
      //TODO: iterate through accounts making the requests
      return $http
          .get('/api/conexao_uff/files')
          .then(function(response){
            var files = response.data;
            DB.delete('files', { 'system' : 'conexao_uff'}).then(function(){
              angular.forEach(files, function(file){
                self.create(file)
              })
            });
          });
    }
  };

  return self;
}
