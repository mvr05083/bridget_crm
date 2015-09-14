angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'studentCtrl',
  'studentService',
  '720kb.datepicker',
  'ageFilter',
  'ui.bootstrap'
])

.config(function($httpProvider, ChartJsProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  ChartJsProvider.setOptions({
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 0
  })
});
