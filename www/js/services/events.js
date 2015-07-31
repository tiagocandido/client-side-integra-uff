function Events($http) {
  events = [];

  return {
    all: function() {
      return events;
    },
    remove: function(_event) {
      events.splice(events.indexOf(_event), 1);
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    },
    create: function(){

    },
    fetch: function(){
      return $http
          .get('/api/conexao_uff/events')
          .then(function(response){
            events = response.data;
          });
    }
  };
}