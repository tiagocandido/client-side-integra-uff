function FilesCtrl($scope, Files) {
  Files.all().then(function(files){
    $scope.files = files
  });
}
