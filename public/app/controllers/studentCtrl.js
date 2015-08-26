angular.module('studentCtrl', [])

.controller('studentController', function(Student){

	var vm = this;

	vm.processing = true;

	// Automatically loads all the students on initial view load
	Student.all()
		.success(function(data){
			 vm.processing = false;
			 vm.students = data;
	});

	// Called when delete is called
	vm.deleteStudent = function(id){
		vm.processing = true;

		Student.delete(id)
		.success(function(data){
			Student.all()
			.success(function(data){
				vm.processing = false;
				vm.students = data;
			});
		});
	};

})

.controller('studentCreateController', function(Student){

	var vm = this;

	// variable used to display info in the view
	vm.type = 'create';

	vm.saveStudent = function(){

		vm.processing = true;

		vm.message = '';

		Student.create(vm.studentData)
		.success(function(data){
			vm.processing = false;
			vm.studentData = {};
			vm.message = data.message;
		});
	};

})

.controller('studentEditController', function(Student, $routeParams){
	var vm = this;

	vm.type = 'edit';

	Student.get($routeParams.student_id)
	.success(function(data){
		vm.studentData = data;
	});

	vm.saveStudent = function(){
		vm.processing = true;
		vm.message = '';

		Student.update($routeParams.student_id, vm.studentData)
		.success(function(data){
			vm.processing = false;
			vm.studentData = {};
			vm.message = data.message;
		});
	};
})
