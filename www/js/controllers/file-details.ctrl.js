function FileDetailsCtrl($scope, $stateParams, $timeout, $cordovaFileTransfer, $ionicPlatform, Files, FileManager, Courses, Accounts) {
  Files.get($stateParams.fileId).then(function(file){
    $scope.file = file;
    $scope.file.file_size = parseInt(file.file_size);

    Courses.get(file.course_id).then(function(course){
      $scope.file.course_name = course.name;

      $ionicPlatform.ready(function() {
        FileManager.check(file)
          .then(function(success) {
            $scope.downloaded = true;
          }, function (error) {
            $scope.downloaded = false;
        });
      });
    });

  });

  $scope.fileDownload = function(file){
      var filePath = [file.system, file.course_name.replace('/','-'), file.system_id, file.file_name].join("/")
      var targetPath = cordova.file.externalRootDirectory + '/integrauff/' + filePath;
      var options = {}

      $scope.downloading = true;

      //TODO: generic header builder
      Accounts.getToken(file.system).then(function(token){
        options.headers = { "AUTHORIZATION": "Token token=" + token };

        $ionicPlatform.ready(function() {
          $cordovaFileTransfer.download(file.download_url, targetPath, options, true).then(function (result) {
              console.log('Success');
              $scope.downloaded = true;
              $scope.downloading = false;
              $cordovaLocalNotification.add({
                message: file.file_name + '-' + file.system,
                title: "IntegraUFF - Arquivo baixado",
                autoCancel: true,
              });
          }, function (error) {
              console.log('Error');
              $scope.downloading = false;
          }, function (progress) {
            $timeout(function() {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            })
          });
        });
      });
  };

  $scope.fileOpen = function(file){
    $ionicPlatform.ready(function() {
      FileManager.open(file);
    });
  };

  $scope.fileRemove = function(file){
    $ionicPlatform.ready(function() {
      FileManager.remove(file).
        then(function(success) {
            $scope.downloaded = false;
          }, function (error) {
        });;
    });
  };
};
