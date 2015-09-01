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
			vm.message = data.message;
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

    console.log(vm.studentData);
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
	vm.tab = 'math';

	Student.get($routeParams.student_id)
	.success(function(data){
		vm.studentData = data;
	});

	vm.setTab = function(tab){
		vm.tab = tab;
	};

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

	vm.comment = function(){
		vm.processing = true;
		vm.message = '';

		Student.comment($routeParams.student_id, vm.commentData)
		.success(function(data){
			vm.processing = false;
			vm.commentData = {};

			Student.get($routeParams.student_id)
			.success(function(data){
				vm.studentData = data;
			});
		})
	}
})
