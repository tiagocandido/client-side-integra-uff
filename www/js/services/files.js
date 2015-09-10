function Files($http, DB) {
  var self = {
    all: function() {
      return DB.selectAllWithJoin('files', {
        tableName: 'courses',
        foreignKey: 'course_id',
        columns: 'courses.name as course_name'
      });
    },
    delete: function(where) {
      return DB.delete('files', where)
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
    fetch: function(params){
      //TODO: iterate through accounts making the requests
      return $http({
        url: 'https://integra-uff.herokuapp.com/conexao_uff/files',
        method: "GET",
        params: params
      })
          .then(function(response){
            var files = response.data;
            angular.forEach(files, function(file){
              self.create(file)
            })
          });
    }
  };

  return self;
}
