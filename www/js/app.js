// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('integraUff', ['ionic', 'angular-websql', 'angular.filter', 'integraUff.controllers', 'integraUff.services'])

    .run(function($ionicPlatform, DB, Sync, Settings) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }


            DB.init()
                .then(function(){
                    return Settings.init();
                })
                .then(function(){
                    return Settings.getSetting('SYNC_INTERVAL')
                })
                .then(function(interval){
                    Sync.start(interval);
                });
        });
    })


    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');

        $httpProvider.interceptors.push('ConexaoUffInterceptor');

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/tab-settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('tab.accounts', {
                url: '/accounts',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/tab-accounts.html',
                        controller: 'AccountsCtrl'
                    }
                }
            })

            .state('tab.login', {
                url: '/login',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('tab.courses', {
                url: '/courses',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-courses.html',
                        controller: 'CoursesCtrl'
                    }
                }
            })
            .state('tab.course-detail', {
                url: '/courses/:courseId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/course-detail.html',
                        controller: 'CourseDetailsCtrl'
                    }
                }
            })
            .state('tab.topic-detail', {
                url: '/topics/:topicId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/topic-detail.html',
                        controller: 'TopicDetailsCtrl'
                    }
                }
            })

            .state('tab.events', {
                url: '/events',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-events.html',
                        controller: 'EventsCtrl'
                    }
                }
            })

            .state('tab.files', {
                url: '/files',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-files.html',
                        controller: 'FilesCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
