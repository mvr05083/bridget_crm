angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'studentCtrl',
  'studentService',
  '720kb.datepicker',
  'ageFilter'
])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
