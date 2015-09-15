function FilesCtrl($scope, Files) {
  $scope.init = function() {
    Files.all().then(function (files) {
      $scope.files = files
    })
  };

  $scope.$on("SYNC_STOP", function(){
    $scope.init();
  });

  $scope.init();
}
