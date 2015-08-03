angular.module('integraUff.config', [])
    .constant('DB_CONFIG', {
      name: 'IntegraUFF',
      tables: [
        {
          name : 'accounts',
          columns: {
            'system' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'login' : {
              'type': 'TEXT'
            },
            'password' : {
              'type': 'TEXT'
            },
            'token' : {
              'type': 'TEXT'
            }
          }
        },
        {
          name : 'courses',
          columns: {
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'INTEGER',
              'primary' : true
            },
            'name' : {
              'type' : 'TEXT'
            },
            'info': {
              'type' : 'TEXT'
            }
          }
        }
      ]
    });