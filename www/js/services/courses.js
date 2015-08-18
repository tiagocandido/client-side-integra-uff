function Courses($http, DB) {
  var self =  {
    all: function() {
      return DB.selectAll('courses');
    },
    remove: function(course) {
    },
    get: function(courseId) {
      return DB.select('courses', {'id':courseId})
      .then(function(result){
        return result.pop();
      });
    },
    create: function(course_attributes){
      return DB.insert('courses', course_attributes, true)
    },
    fetch: function(){
      //TODO: iterate through accounts making the requests
      return $http
          .get('/api/conexao_uff/courses')
          .then(function(response){
            var courses = response.data;
            angular.forEach(courses, function(course){
              self.create(course)
            })
          });
    },
    fetch_events: function(courseId) {
      var time_now = new Date().toISOString();
      return DB.select('events',
        {'ends': {
          'operator': '>=',
          'value': time_now,
          'union': 'AND'
        }, 'course_id':courseId})
        .then(function(result){
          return result;
        });
    },
    fetch_topics: function(courseId) {
      return DB.select('topics',
        {'course_id':courseId})
        .then(function(result){
          return result;
        });
    }
  };

  return self;
}
