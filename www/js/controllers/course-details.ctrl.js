function CourseDetailsCtrl($scope, $stateParams, Courses) {
  Courses.get($stateParams.courseId).then(function(course){
    $scope.course = course;
  });
};


