angular.module('integraUff.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
  {
    name: 'accounts',
    columns: [
      {name: 'system', type: 'text primary key'},
      {name: 'login', type: 'text'},
      {name: 'password', type: 'text'}
    ]
  }
]
});