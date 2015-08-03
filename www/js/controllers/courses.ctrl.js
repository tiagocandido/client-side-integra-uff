function CoursesCtrl($scope, Courses) {
  Courses.all().then(function(courses){
    $scope.courses = courses
  });

  $scope.remove = function(course) {
    Courses.remove(course);
  }
}