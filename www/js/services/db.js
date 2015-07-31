function DB($webSql, DB_CONFIG){
  var self = this,
      db = null;

  self.init = function() {
    // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
    db = $webSql.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

    angular.forEach(DB_CONFIG.tables, function(table) {
      db.createTable(table.name, table.columns).then(function(result){
        console.log('Table ' + table.name + ' initialized');
      });
    });
  };

  self.insert = function(tableName, fields, replace){
    return db.insert(tableName, fields, replace);
  };
  self.select = function(tableName, where){
    return db.select(tableName, where).then(function(result){
      return result.rows;
    })
  };
  self.selectAll = function(tableName){
    return db.selectAll(tableName).then(function(result){
      return result.rows;
    })
  };
  self.update = function(tableName, fields, where){
    return db.update(tableName, fields, where)
  };
  self.delete = function(tableName, where){
    return db.selectAll(tableName, where)
  };

  return self;
}
