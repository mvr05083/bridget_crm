angular.module('userApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'studentCtrl',
	'studentService'
])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
});
