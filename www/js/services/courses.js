function Courses($http) {
  var courses = [{
    id: 1,
    name: "Programação I",
    info: "Básico de programação."
  }, {
    id: 2,
    name: "Cálculo I",
    info: "informação de calculo I"
  }];

  return {
    all: function() {
      return courses;
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
    create: function(){

    },
    fetch: function(){
      return $http
          .get('/api/conexao_uff/courses')
          .then(function(response){
            courses = response.data;
          });
    }
  };
}