function DB($webSql, $q, DB_CONFIG){
  var self = this,
      db = null;

  self.init = function() {
    var deferred = $q.defer(),
        queries = [];
    // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
    db = $webSql.openDatabase(DB_CONFIG.name);

    angular.forEach(DB_CONFIG.tables, function(table) {
      queries.push(db.createTable(table.name, table.columns));
    });

    $q.all(queries).then(function(){
      deferred.resolve();
    }, function(){
      deferred.reject();
    });
    return deferred.promise
  };

  self.insert = function(tableName, fields, replace){
    return db.insert(tableName, fields, replace);
  };
  self.select = function(tableName, where){
    return db.select(tableName, where).then(function(result){
      return resultSetRowListToArray(result.rows);
    })
  };
  self.selectAll = function(tableName){
    return db.selectAll(tableName).then(function(result){
      return resultSetRowListToArray(result.rows);
    })
  };
  self.selectAllWithJoin = function(tableName, joinTable){
    var columns = "`" + tableName + "`.*, ";
    columns += joinTable.columns;

    var query = "SELECT " + columns + " FROM `" + tableName + "`";
    query += " INNER JOIN `" + joinTable.tableName
      + "` ON `" + tableName + "`.`" + joinTable.foreignKey + "` = `" + joinTable.tableName + "`.`id`;";

    return db.executeQuery(query, []).then(function(result){
      return resultSetRowListToArray(result.rows);
    })
  };
  self.update = function(tableName, fields, where){
    return db.update(tableName, fields, where)
  };
  self.delete = function(tableName, where){
    return db.del(tableName, where)
  };

  var resultSetRowListToArray = function(resultSetRowList){
    var array = [];
    for(var i=0; i< resultSetRowList.length; i++) array.push(resultSetRowList.item(i));
    return array
  };

  return self;
}
