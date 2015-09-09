function CourseDetailsCtrl($scope, $stateParams, Courses) {
  Courses.get($stateParams.courseId).then(function(course){
    $scope.course = course;
    Courses.fetch_events($scope.course.id).then(function(events){
      $scope.events = events;
    });
    Courses.fetch_topics($scope.course.id).then(function(topics){
      $scope.topics = topics;
    });
    Courses.fetch_files($scope.course.id).then(function(files){
      $scope.files = files;
    });
  });
};


