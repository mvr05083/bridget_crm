angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html',
      controller: 'mainController',
      controllerAs: 'home'
    })

  .when('/login', {
    templateUrl: 'app/views/pages/login.html',
    controller: 'mainController',
    controllerAs: 'login'
  })

  .when('/students', {
    templateUrl: 'app/views/pages/students/all.html',
    controller: 'studentController',
    controllerAs: 'student'
  })

  .when('/students/create', {
    templateUrl: 'app/views/pages/students/new.html',
    controller: 'studentCreateController',
    controllerAs: 'student'
  })

  .when('/students/:student_id/math', {
    templateUrl: 'app/views/pages/students/math.html',
    controller: 'studentEditController',
    controllerAs: 'student'
  })

  .when('/students/:student_id/ela', {
    templateUrl: 'app/views/pages/students/ela.html',
    controller: 'studentEditController',
    controllerAs: 'student'
  })

  .when('/students/:student_id/comment', {
    templateUrl: 'app/views/pages/students/comment.html',
    controller: 'studentEditController',
    controllerAs: 'student'
  })

  $locationProvider.html5Mode(true);
});
