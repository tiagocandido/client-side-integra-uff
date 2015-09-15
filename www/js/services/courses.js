function Courses($http, DB, NotificationManager) {
  var self =  {
    all: function() {
      return DB.selectAll('courses')
    },
    delete: function(where) {
      return DB.delete('courses', where)
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
    fetch: function(params){
      //TODO: iterate through accounts making the requests
      return $http({
        url: 'https://integra-uff.herokuapp.com/conexao_uff/courses',
        method: "GET",
        params: params
      })
          .then(function(response){
            var courses = response.data;
            angular.forEach(courses, function(course){
              self.create(course).then(function(){
                if('last_sync' in params) NotificationManager.newCourse(course);
              })
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
    },
    fetch_files: function(courseId) {
      return DB.select('files',
          {'course_id':courseId})
          .then(function(result){
            return result;
          });
    }
  };

  return self;
}
