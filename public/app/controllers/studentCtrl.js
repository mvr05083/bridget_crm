angular.module('studentCtrl', ["chart.js"])

.controller('studentController', function(Student) {

  var vm = this;

  vm.processing = true;
  // Automatically loads all the students on initial view load
  Student.all()
    .success(function(data) {
      vm.processing = false;
      if (data.success != false) {
        vm.students = data;
      } else {
        vm.students = false;
      }
    });


  // Called when delete is called
  vm.deleteStudent = function(id) {
    vm.processing = true;

    Student.delete(id)
      .success(function(data) {
        vm.message = data.message;
        Student.all()
          .success(function(data) {
            vm.processing = false;
            vm.students = data;
          });
      });
  };

})

.controller('studentCreateController', function(Student, $templateCache) {

  var vm = this;

  // variable used to display info in the view
  vm.type = 'create';

  vm.saveStudent = function() {

    vm.processing = true;

    vm.message = '';

    Student.create(vm.studentData)
      .success(function(data) {
        vm.processing = false;
        vm.studentData = {};
        vm.message = data.message;
      });
  };

})

.controller('studentEditController', function(Student, $routeParams) {
  var vm = this;

  vm.edit = false;
  vm.student_id = $routeParams.student_id;

  vm.labels = ["ROTE", "Num Obj", "Fluent", "Patterns", "Num Id", "Thinking", "2D", "3D", "1 More", "1 Less"];
  vm.data = [
    [
      46,27,71,98,11,30,89,100,82,68
    ],
    [
      66,80,36,31,83,67,23,72,7,98
    ]
  ];

  Student.get($routeParams.student_id)
    .success(function(data) {
      vm.studentData = data.message;
      vm.series = [data.message.name, data.message.name];
    });

  vm.toggleEdit = function() {
    if (vm.edit == true)
      vm.edit = false;
    else
      vm.edit = true;
  };

  vm.calculateAge = function(birthday) { // pass in player.dateOfBirth
    var ageDifMs = Date.now() - new Date(birthday);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    // return ageDate.getFullYear() + " " + ageDate.getMonth();
    return Math.abs(ageDate.getUTCFullYear() - 1970) + " years, " + (ageDate.getMonth() + 1) + " months";
  };

  vm.setTab = function(tab) {
    vm.tab = tab;
  };

  vm.saveStudent = function() {
    vm.processing = true;
    vm.message = '';

    Student.update($routeParams.student_id, vm.studentData)
      .success(function(data) {
        vm.processing = false;
        vm.message = data.message;

        Student.get($routeParams.student_id)
          .success(function(data) {
            vm.studentData = data.message;
            vm.toggleEdit();
          });
      })
  };

  vm.comment = function() {
    vm.processing = true;
    vm.message = '';

    Student.comment($routeParams.student_id, vm.commentData)
      .success(function(data) {
        vm.processing = false;
        vm.commentData = {};

        Student.get($routeParams.student_id)
          .success(function(data) {
            vm.studentData = data.message;
          });
      })
  }
})
