function Sync($q, Accounts, Courses, Events){
      var self = {
        hasSyncedAccount: function(){
          return Accounts.hasAccount();
        },
        run: function(){
          var deferred = $q.defer();

          $q.all([Courses.fetch(),Events.fetch()]).then(function(){
            deferred.resolve();
          });

          return deferred.promise;
        }
      };
      return self;
    }