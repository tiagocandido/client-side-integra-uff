function TopicDetailsCtrl($scope, $stateParams, Topics) {
  Topics.get($stateParams.topicId).then(function(topic){
    $scope.topic = topic;
    Topics.fetch_answers($scope.topic.id).then(function(answers){
      $scope.answers = answers;
    });
  });
};


