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
            'id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT'
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
            'id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT'
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
        },
        {
          name : 'settings',
          columns : {
            'name' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'value' : {
              'type' : 'TEXT'
            },
            'type' : {
              'type' : 'TEXT'
            }
          }
        },
        {
          name : 'topics',
          columns : {
            'id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT'
            },
            'created_at' : {
              'type' : 'TEXT'
            },
            'updated_at' : {
              'type' : 'TEXT'
            },
            'name' : {
              'type' : 'TEXT'
            },
            'author' : {
              'type' : 'TEXT'
            },
            'course_id' : {
              'type' : 'TEXT'
            }
          }
        },
        {
          name : 'answers',
          columns : {
            'id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT'
            },
            'updated_at' : {
              'type' : 'TEXT'
            },
            'content' : {
              'type' : 'TEXT'
            },
            'author' : {
              'type' : 'TEXT'
            },
            'topic_id' : {
              'type' : 'TEXT'
            }
          }
        },
        {
          name : 'files',
          columns : {
            'id' : {
              'type' : 'TEXT',
              'primary' : true
            },
            'system' : {
              'type' : 'TEXT'
            },
            'system_id' : {
              'type' : 'TEXT'
            },
            'created_at' : {
              'type' : 'TEXT'
            },
            'updated_at' : {
              'type' : 'TEXT'
            },
            'description' : {
              'type' : 'TEXT'
            },
            'course_id' : {
              'type' : 'TEXT'
            },
            'file_name' : {
              'type' : 'TEXT'
            },
            'file_size' : {
              'type' : 'TEXT'
            },
            'content_type' : {
              'type' : 'TEXT'
            },
            'download_url' : {
              'type' : 'TEXT'
            }
          }
        }
      ]
    });
