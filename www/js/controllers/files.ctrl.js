function FilesCtrl($scope, Files, FileManager) {
  Files.all().then(function(files){
    $scope.files = files
  });

  $scope.fileDownload = function(file){
    FileManager.download(file);
  };

  $scope.fileOpen = function(file){
    FileManager.open(file);
  };

  $scope.checkFile = function(file){
    var checked = false;
    FileManager.check(file)
      .then(function(success) {
        console.log('deu bom');
        checked = true;
      }, function (error) {
        console.log('deu ruim');
        return false;
      });;
    console.log(checked);
    return checked;
  };

}
