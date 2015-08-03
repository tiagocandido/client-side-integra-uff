function Courses($http, DB) {
  var self =  {
    all: function() {
      return DB.selectAll('courses');
    },
    remove: function(course) {
    },
    get: function(courseId) {

    },
    create: function(course_attributes){
      return DB.insert('courses', course_attributes, true)
    },
    fetch: function(){
      return $http
          .get('/api/conexao_uff/courses')
          .then(function(response){
            var courses = response.data;
            angular.forEach(courses, function(course){
              self.create(course)
            })
          });
    }
  };

  return self;
}