function FileManager($http, $cordovaFileTransfer, $cordovaLocalNotification, $ionicPlatform, $cordovaFileOpener2, Accounts, $cordovaFile) {

  var buildFilePath = function(file){
    var filePath = [file.system, file.course_name.replace('/','-'), file.system_id, file.file_name].join("/");
    return cordova.file.externalRootDirectory + '/integrauff/' + filePath;
  };

  var self = {
    download: function(file) {
      var targetPath = buildFilePath(file);
      var options = {};

      //TODO: generic header builder
      Accounts.getToken(file.system).then(function(token){
        options.headers = { "AUTHORIZATION": "Token token=" + token };

        $ionicPlatform.ready(function() {
          $cordovaFileTransfer.download(file.download_url, targetPath, options, true).then(function (result) {
              console.log('Success');
              $cordovaLocalNotification.add({
                message: file.file_name + '-' + file.system,
                title: "IntegraUFF - Arquivo baixado",
                autoCancel: true
              });
          }, function (error) {
              console.log('Error');
          }, function (progress) {

          });
        });
      });
    },

    open: function(file){
      $cordovaFileOpener2.open(
        buildFilePath(file),
        file.content_type
      ).then(function() {
          // Success!
      }, function(err) {
          // An error occurred. Show a message to the user
      });
    },

    check: function(file){
      var filePath = ['integrauff', file.system, file.course_name.replace('/','-'), file.system_id, file.file_name].join("/");
      return $cordovaFile.checkFile(cordova.file.externalRootDirectory, filePath);
    }
  };

  return self;
}
