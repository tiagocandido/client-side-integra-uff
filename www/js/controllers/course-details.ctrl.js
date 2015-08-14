function CourseDetailsCtrl($scope, $stateParams, Courses) {
  Courses.get($stateParams.courseId).then(function(course){
    $scope.course = course;

    Courses.fetch_events($scope.course.system_id).then(function(events){
      $scope.events = events;
    });
  });
};


