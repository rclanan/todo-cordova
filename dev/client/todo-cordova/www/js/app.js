angularSPA = {
  partialsPath: window.ionic ? 'templates-mobile/' : 'templates/'
};

angular.module('todoList', [ window.ionic ? 'ionic' : 'ui.bootstrap', 'todoList.controllers', 'todoList.services'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl:angularSPA + 'auth.html'
      })
      .state('auth.signin', {
        url: '/signin',
        views: {
          'auth-signin': {
            templateUrl:angularSPA + 'auth-signin.html',
            controller: 'SignInCtrl'
          }
        }
      })
      .state('auth.signup', {
        url: '/signup',
        views: {
          'auth-signup': {
            templateUrl:angularSPA + 'auth-signup.html',
            controller: 'SignUpCtrl'
          }
        }
      })
      .state('todo', {
        url: '/todo',
        abstract: true,
        templateUrl:angularSPA + 'todo.html'
      })
      .state('todo.list', {
        url: '/list',
        views: {
          'todo-list' : {
            templateUrl:angularSPA + 'todo-list.html',
            controller: 'todoListCtrl'
          }
        }
      })
      .state('todo.completed', {
        url: '/completed',
        views: {
          'todo-completed': {
            templateUrl:angularSPA + 'todo-completed.html',
            controller: 'completedCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/auth/signin');
  });
