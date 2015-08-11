function Settings(DB){
  var self = this;

  self.getSetting = function(name){
    return DB.select('settings', { name : name }).then(function(result){
      return result.length ? result[0] : undefined
    })
  };

  self.setSetting = function(name, value){
    return DB.insert('settings', { name : name, value : value }, true)
  }
}