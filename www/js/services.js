angular.module('integraUff.services', ['integraUff.config'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Courses', function($http) {
  var courses = [{
    id: 1,
    name: "Programação I",
    info: "Básico de programação."
  }, {
    id: 2,
    name: "Cálculo I",
    info: "informação de calculo I"
  }];

  return {
    all: function() {
      return courses;
    },
    remove: function(course) {
      courses.splice(courses.indexOf(course), 1);
    },
    get: function(courseId) {
      for (var i = 0; i < courses.length; i++) {
        if (courses[i].id === parseInt(courseId)) {
          return courses[i];
        }
      }
      return null;
    },
    fetch: function(){
      $http
        .get('/api/conexao_uff/courses')
        .then(function(response){
          courses = response.data;
        });
    }
  };
})

.factory('Events', function($http) {
  events = []

  return {
    all: function() {
      return events;
    },
    remove: function(_event) {
      events.splice(events.indexOf(_event), 1);
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    },
    fetch: function(){
      $http
        .get('/api/conexao_uff/events')
        .then(function(response){
          events = response.data;
        });
    }
  };
})

.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})

.factory('Accounts', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM accounts')
            .then(function(result){
                return DB.fetchAll(result);
            });
    };

    self.getById = function(id) {
        return DB.query('SELECT * FROM accounts WHERE id = ?', [id])
            .then(function(result){
                return DB.fetch(result);
            });
    };

    self.create = function(system, login, password){
      return true;//DB.query('INSERT INTO accounts(system, login, password) VALUES(?, ?, ?);',[system, login, password])
    };

    return self;
})

.factory('Autentication', function($http, Accounts){
  const autenticationPath = '/api/conexao_uff/login';
  self = {
    login: function(credentials){
      return $http
          .post(autenticationPath, credentials)
          .then(function(response){
            window.sessionStorage['token_iduff'] = response.data.token;
            Accounts.create('conexao_uff', credentials.login, credentials.password);
          })
    }
  };
  return self;
})

.factory('Sync', function($http, Accounts, Courses, Events){
  self = {
    run: function(){
      Courses.fetch();
      Events.fetch();
    }
  };
  return self;
})

.factory('ConexaoUffInterceptor', function(){
    const UNAUTHORIZED = 401;
    return {
        request : function(config){
            if(config.url.indexOf('api/conexao_uff/')!= -1){
              config.headers = config.headers || {};
              var token = window.sessionStorage['token_iduff'];
              if (token) {
                if(!config.params) config.params = {};
                config.params.token = token;
              }
            };
            return config;
        }
    }
});
