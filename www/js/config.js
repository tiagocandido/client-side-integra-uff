angular.module('integraUff.config', [])
    .constant('DB_CONFIG', {
      name: 'IntegraUFF',
      tables: [
        {
          name : 'accounts',
          columns: {
            'system' : {
              'type' : 'text',
              'primary' : true
            },
            'login' : {
              'type': 'text'
            },
            'password' : {
              'type': 'text'
            },
            'token' : {
              'type': 'text'
            }
          }
        }
      ]
    });