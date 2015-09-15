angular.module('studentCtrl', ["chart.js"])

.controller('studentController', function(Student) {

  var vm = this;

  vm.processing = true;
  // Automatically loads all the students on initial view load
  Student.all()
    .success(function(data) {
      vm.processing = false;
      if (data.length > 0) {
        vm.students = data;
      } else {
        vm.students = [];
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

.controller('studentCreateController', function(Student) {

  var vm = this;

  // variable used to display info in the view
  vm.type = 'create';

  vm.saveStudent = function() {

    vm.processing = true;

    vm.message = '';

    console.log(vm.studentData);
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

  vm.labels =["ROTE", "Num Obj", "Fluent", "Patterns", "Num Id", "Thinking", "2D", "3D", "1 More", "1 Less"];

  Student.get($routeParams.student_id)
    .success(function(data) {
      vm.studentData = data.message;
      vm.options = {
        scaleSteps : 10,
        scaleStepWidth : 10,
        scaleStartValue : 0
      };
      vm.data = [
        [
          data.message.math.rote / 120 * 100,
          data.message.math.num_objects / 52 * 100,
          data.message.math.fluent_to / 52 * 100,
          56,
          data.message.math.num_id / 52 * 100,
          data.message.math.thinking / 21 * 100,
          data.message.math.two_d_shapes / 5 * 100,
          data.message.math.three_d_shapes / 4 * 100,
          data.message.math.one_more / 5 * 100,
          data.message.math.one_less / 5 * 100
        ],
        [
          data.message.math.rote / 130 * 100,
          data.message.math.num_objects / 72 * 100,
          data.message.math.fluent_to / 5 * 100,
          data.message.math.patterns / 22 * 100,
          75,
          62,
          data.message.math.two_d_shapes / 45 * 100,
          data.message.math.three_d_shapes / 24 * 100,
          data.message.math.one_more / 15 * 100,
          data.message.math.one_less / 51 * 100
        ],
        [
          3,
          40,
          25,
          7,
          11,
          15,
          55,
          98,
          72,
          45
        ]
      ];
      vm.series = data.message.name;
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
