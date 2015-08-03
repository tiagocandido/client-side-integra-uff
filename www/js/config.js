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
              'type' : 'TEXT',
              'primary' : true
            },
            'name' : {
              'type' : 'TEXT'
            },
            'info': {
              'type' : 'TEXT'
            }
          }
        },
        {
          name : 'events',
          columns : {
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'starts' : {
              'type' : 'TEXT'
            },
            'ends' : {
              'type' : 'TEXT'
            },
            'name' : {
              'type' : 'TEXT'
            },
            'info' : {
              'type' : 'TEXT'
            },
            'course_id' : {
              'type' : 'TEXT'
            }
          }
        }
      ]
    });