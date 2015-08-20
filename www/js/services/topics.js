function Topics($http, DB, Answers) {
  var self = {
    all: function() {
      return DB.selectAll('topics');
    },
    create: function(topic_attributes){
      return DB.insert('topics', topic_attributes, true)
    },
    fetch: function(){
      //TODO: iterate through accounts making the requests
      return $http
          .get('/api/conexao_uff/topics')
          .then(function(response){
            var topics = response.data;
            angular.forEach(topics, function(topic){
              self.create_answers(topic.answers)
              delete topic.answers
              self.create(topic)
            })
          });
    },
    create_answers: function(answers){
      angular.forEach(answers, function(answer){
        Answers.create(answer)
      });
    }
  };

  return self;
}
