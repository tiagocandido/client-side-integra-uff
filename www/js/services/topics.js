function Topics($http, DB, Answers) {
  var self = {
    all: function() {
      return DB.selectAll('topics');
    },
    create: function(topic_attributes){
      return DB.insert('topics', topic_attributes, true)
    },
    get: function(topicId) {
      return DB.select('topics', {'id':topicId})
      .then(function(result){
        return result.pop();
      });
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
    },
    fetch_answers: function(topicId) {
      return DB.select('answers',
        {'topic_id':topicId})
        .then(function(result){
          return result;
        });
    }
  };

  return self;
}
