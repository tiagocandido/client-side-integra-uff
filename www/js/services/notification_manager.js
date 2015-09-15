function NotificationManager($state){
  var _notifications = [],
      add = function(notification){
        cordova.plugins.notification.local.schedule(notification);
        _notifications.push(notification);
      };

  return {
    newTopic: function(topic){
      var notification = {
        id: topic.system_id,
        title: 'Um tópico foi adicionado/atualizado!',
        text: topic.name,
        data : {
          type: 'topic',
          resource: topic
        }
      };
      return add(notification);
    },
    newEvent: function(event){
      var notification = {
        id: event.system_id,
        title: 'Um evento foi adicionado/atualizado!',
        text: event.name,
        data: {
          type: 'event',
          resource: event
        }
      };
      return add(notification);
    },
    newCourse: function(course){
      var notification = {
        id: course.system_id,
        title: 'Você foi inscrito em uma nova disciplina!',
        text: course.name,
        data: {
          type: 'course',
          resource: course
        }
      };
      return add(notification);
    },
    newFile: function(file){
      var notification = {
        id: file.system_id,
        title: 'Um novo arquivo foi adicionado!',
        text: file.description,
        data: {
          type: 'file',
          resource: file
        }
      };
      return add(notification);
    },
    handleNotifications: function(){
      cordova.plugins.notification.local.on("click", function (notification) {
        var data = JSON.parse(notification.data),
            type = data.type,
            resource = data.resource;

        switch (type){
          case 'topic' :
            $state.go('tab.topic-detail', { topicId: resource.id});
            break;
          case 'events' :
            $state.go('tab.events');
            break;
          case 'course' :
            $state.go('tab.course-detail', { courseId: resource.id});
            break;
          case 'file' :
            $state.go('tab.file-detail', { fileId: resource.id});
        }

        cordova.plugins.notification.local.cancel(notification.id, function(){
          _notifications = _notifications.filter(function(elem){
            return elem.id != notification.id
          })
        });
      })
    }
  }
}