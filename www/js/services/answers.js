function Answers($http, DB) {
  var self = {
    all: function() {
      return DB.selectAll('answers');
    },
    create: function(answer_attribute){
      return DB.insert('answers', answer_attribute, true)
    },
  };

  return self;
}
