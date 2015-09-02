function FilesCtrl($scope, Files, $cordovaFileTransfer, $ionicPlatform, Accounts, $timeout) {
  Files.all().then(function(files){
    $scope.files = files
  });

  $scope.FileDownload = function(file){
      var filePath = [file.system, file.course_name.replace('/','-'), file.system_id, file.file_name].join("/")
      var targetPath = cordova.file.externalRootDirectory + '/integrauff/' + filePath;
      var options = {}

      //TODO: generic header builder
      Accounts.getToken(file.system).then(function(token){
        options.headers = { "AUTHORIZATION": "Token token=" + token };

        $ionicPlatform.ready(function() {
          $cordovaFileTransfer.download(file.download_url, targetPath, options, true).then(function (result) {
              console.log('Success');
          }, function (error) {
              console.log('Error');
          }, function (progress) {

          });
        });
      });
  };

}
