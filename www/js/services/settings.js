function Settings(DB){
  var self = this;

  self.getSetting = function(name){
    return DB.select('settings', { name : name }).then(function(result){
      var value, setting = result[0] ;
      if(result.length){
        value = setting.value;
        if(setting.type == 'INTEGER'){
          value = parseInt(value);
        }
      }
      return value
    })
  };

  self.setSetting = function(name, value){
    var type = isNaN(value) ? 'TEXT' : 'INTEGER';
    return DB.insert('settings', { name : name, value : value, type : type }, true)
  };

  self.init = function(){
    self.setSetting('SYNC_INTERVAL', 1000 * 60 * 60, 'INTEGER'); // Sets default sync interval to 1 hour
  };

  return self;
}