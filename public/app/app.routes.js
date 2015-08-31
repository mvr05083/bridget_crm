angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'app/views/pages/home.html',
		controller : 'mainController',
		controllerAs : 'home'
	})

	.when('/login', {
		templateUrl : 'app/views/pages/login.html',
		controller : 'mainController',
		controllerAs : 'login'
	})

	.when('/students', {
		templateUrl : 'app/views/pages/students/all.html',
		controller : 'studentController',
		controllerAs : 'student'
	})

	.when('/students/create', {
		templateUrl : 'app/views/pages/students/single.html',
		controller : 'studentCreateController',
		controllerAs: 'student'
	})

	.when('/students/:student_id',{
		templateUrl : 'app/views/pages/students/edit.html',
		controller : 'studentEditController',
		controllerAs : 'student'
	})

	$locationProvider.html5Mode(true);
});
