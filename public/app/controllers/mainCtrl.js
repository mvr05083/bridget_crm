angular.module('mainCtrl', ["chart.js", "ui.bootstrap.collapse", "ui.bootstrap.dropdown"])

.controller('mainController', function($rootScope, $location, Auth) {
  var vm = this;
  vm.navbarCollapsed = true;
  //chart information
  vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
  vm.series = ['Series A', 'Series B'];
  vm.data = [
   [65, 59, 80, 81, 56, 55, 40],
   [28, 48, 40, 19, 86, 27, 90]
  ];
  vm.onClick = function (points, evt) {
   console.log(points, evt);
  };

  vm.loggedIn = Auth.isLoggedIn();

  $rootScope.$on('$routeChangeStart', function() {

    vm.loggedIn = Auth.isLoggedIn();

    Auth.getUser()
      .success(function(data) {
        vm.user = data;
      });

  });

  vm.doLogin = function() {

    vm.processing = true;

    vm.error = false;

    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data) {
        vm.processing = false;
        if (data.success) {
          vm.loggedIn = Auth.isLoggedIn();
          $location.path('/students');
        } else {
          vm.error = data.message;
        }

      });
  };

  vm.doLogout = function() {
    Auth.logout();

    vm.user = {};

    $location.path('/login');
  };

});
