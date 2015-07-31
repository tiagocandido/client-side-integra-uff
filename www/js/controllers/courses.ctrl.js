function CoursesCtrl($scope, Courses) {
  $scope.courses = Courses.all();
  $scope.remove = function(course) {
    Courses.remove(course);
  }
};