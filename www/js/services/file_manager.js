function FileManager($http, $ionicPlatform, $cordovaFileOpener2, Accounts, $cordovaFile) {

  var buildFilePath = function(file){
    var filePath = [file.system, file.course_name.replace('/','-'), file.system_id, file.file_name].join("/");
    return cordova.file.externalRootDirectory + '/integrauff/' + filePath;
  };

  var self = {
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
