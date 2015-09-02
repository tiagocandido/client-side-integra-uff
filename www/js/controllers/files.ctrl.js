function FilesCtrl($scope, Files, $cordovaFileTransfer, $ionicPlatform) {
  Files.all().then(function(files){
    $scope.files = files
  });

  $scope.FileDownload = function (file) {
      var filePath = [file.system, file.course_name, file.system_id, file.file_name].join("/")
      // var targetPath = cordova.file.externalRootDirectory + filePath;

      $ionicPlatform.ready(function() {
        $cordovaFileTransfer.download(file.download_url, filePath, {}, true).then(function (result) {
            console.log('Success');
        }, function (error) {
            console.log('Error');
        }, function (progress) {
            // PROGRESS HANDLING GOES HERE
        });
      });
  };

}
