function Events($http, DB) {
  var self = {
    all: function() {
      return DB.selectAllWithJoin('events', {
        tableName: 'courses',
        foreignKey: 'course_id',
        columns: 'courses.name as course_name'
       });
    },
    remove: function(_event) {

    },
    get: function(eventId) {

    },
    create: function(event_attributes){
      return DB.insert('events', event_attributes, true)
    },
    fetch: function(){
      //TODO: iterate through accounts making the requests
      return $http
          .get('https://integra-uff.herokuapp.com/conexao_uff/events')
          .then(function(response){
            var events = response.data;
            DB.delete('events', { 'system' : 'conexao_uff'}).then(function(){
              angular.forEach(events, function(event){
                self.create(event)
              })
            });
          });
    }
  };

  return self;
}

