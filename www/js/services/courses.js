function Courses($http, DB) {
  var self =  {
    all: function() {
      return DB.selectAll('courses');
    },
    remove: function(course) {
      courses.splice(courses.indexOf(course), 1);
    },
    get: function(courseId) {
      for (var i = 0; i < courses.length; i++) {
        if (courses[i].id === parseInt(courseId)) {
          return courses[i];
        }
      }
      return null;
    },
    create: function(system, system_id, name, info){
      return DB.insert('courses', {'system' : system, 'system_id' : system_id, 'name' : name, 'info' : info}, true)
    },
    fetch: function(){
      return $http
          .get('/api/conexao_uff/courses')
          .then(function(response){
            var courses = response.data;
            angular.forEach(courses, function(course){
              self.create(course.system, course.system_id, course.name, course.info)
            })
          });
    }
  };

  return self;
}