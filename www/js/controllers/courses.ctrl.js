function CoursesCtrl($scope, Courses) {
  $scope.init = function(){
    Courses.all().then(function(courses){
      $scope.courses = courses
    })
  };

  $scope.$on("SYNC_STOP", function(){
    $scope.init();
  });

  $scope.init();
}
