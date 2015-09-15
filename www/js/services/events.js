function Events($http, DB, NotificationManager) {
  var self = {
    all: function() {
      return DB.selectAllWithJoin('events', {
        tableName: 'courses',
        foreignKey: 'course_id',
        columns: 'courses.name as course_name'
      });
    },
    delete: function(where) {
      return DB.delete('events', where)
    },
    get: function(eventId) {

    },
    create: function(event_attributes){
      return DB.insert('events', event_attributes, true)
    },
    fetch: function(params){
      //TODO: iterate through accounts making the requests
      return $http({
        url: 'https://integra-uff.herokuapp.com/conexao_uff/events',
        method: "GET",
        params: params
      })
          .then(function(response){
            var events = response.data;
            angular.forEach(events, function(event){
              self.create(event).then(function(){
                NotificationManager.newEvent(event);
              })
            })
          });
    }
  };

  return self;
}

