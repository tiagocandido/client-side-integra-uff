function Settings($filter, $q, DB){
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

  self.getAllSettings = function(){
    return DB.selectAll('settings')
  };

  self.setSetting = function(name, value, replace){
    var type = isNaN(value) ? 'TEXT' : 'INTEGER';
    return DB.insert('settings', { name : name, value : value, type : type }, replace)
  };

  self.init = function(){
    var defered = $q.defer();
    self.getAllSettings().then(function(settings){
      if (!$filter('filter')(settings, {name : 'SYNC_INTERVAL'}).length)
        self.setSetting('SYNC_INTERVAL', 1000 * 60 * 60, 'INTEGER', false); // Sets default sync interval to 1 hour
      defered.resolve();
    });
    return defered.promise
  };

  return self;
}