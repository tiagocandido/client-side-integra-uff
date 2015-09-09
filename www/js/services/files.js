function Files($http, DB) {
  var self = {
    all: function() {
      return DB.selectAllWithJoin('files', {
        tableName: 'courses',
        foreignKey: 'course_id',
        columns: 'courses.name as course_name'
       });
    },
    get: function(fileId) {
      return DB.select('files', {'id':fileId})
      .then(function(result){
        return result.pop();
      });
    },
    create: function(file_attributes){
      return DB.insert('files', file_attributes, true)
    },
    fetch: function(){
      //TODO: iterate through accounts making the requests
      return $http
          .get('https://integra-uff.herokuapp.com/conexao_uff/files')
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
