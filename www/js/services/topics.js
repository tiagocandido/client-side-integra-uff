function Topics($http, DB, Answers) {
  var self = {
    all: function() {
      return DB.selectAll('topics');
    },
    delete: function(where) {
      return DB.delete('topics', where)
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
    fetch: function(params){
      //TODO: iterate through accounts making the requests
      return $http({
        url: 'https://integra-uff.herokuapp.com/conexao_uff/topics',
        method: "GET",
        params: params
      })
          .then(function(response){
            var topics = response.data;
              angular.forEach(topics, function(topic){
                self.create_answers(topic.answers);
                delete topic.answers;
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
