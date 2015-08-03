function Events($http, DB) {
  var self = {
    all: function() {
      return DB.selectAll('events');
    },
    remove: function(_event) {

    },
    get: function(eventId) {

    },
    create: function(event_attributes){
      return DB.insert('events', event_attributes, true)
    },
    fetch: function(){
      return $http
          .get('/api/conexao_uff/events')
          .then(function(response){
            var events = response.data;
            angular.forEach(events, function(event){
              self.create(event)
            })
          });
    }
  };

  return self;
}