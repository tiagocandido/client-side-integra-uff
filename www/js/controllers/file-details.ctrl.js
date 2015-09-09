function FileDetailsCtrl($scope, $stateParams, Files, FileManager, Courses) {
  Files.get($stateParams.fileId).then(function(file){
    $scope.file = file;

    Courses.get(file.course_id).then(function(course){
      $scope.file.course_name = course.name;

      FileManager.check(file)
        .then(function(success) {
          $scope.downloaded = true;
        }, function (error) {
          $scope.downloaded = false;
      });;
    });

  });


  $scope.fileDownload = function(file){
    FileManager.download(file).then(function (result) {
      console.log('Success');
      $cordovaLocalNotification.add({
        message: file.file_name + '-' + file.system,
        title: "IntegraUFF - Arquivo baixado",
        autoCancel: true
      });
      }, function (error) {
        console.log('Error');
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        });
      };
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
};
