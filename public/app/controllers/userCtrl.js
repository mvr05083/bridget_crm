angular.module('userCtrl', ['userService'])

.controller('userController', function(User){
	
	var vm = this;
	
	vm.processing = true;
	
	// Automatically loads all the users on initial view load
	User.all()
		.success(function(data){
			 vm.processing = false;
			 vm.users = data;
	});
	
	// Called when delete is called
	vm.deleteUser = function(id){
		vm.processing = true;
		
		User.delete(id)
		.success(function(data){
			User.all()
			.success(function(data){
				vm.processing = false;
				vm.users = data;
			});
		});
	};
	
})

.controller('userCreateController', function(User){
	
	var vm = this;
	
	// variable used to display info in the view
	vm.type = 'create';
	
	vm.saveUser = function(){
		
		vm.processing = true;
		
		vm.message = '';
		
		User.create(vm.userData)
		.success(function(data){
			vm.processing = false;
			vm.userData = {};
			vm.message = data.message;
		});
	};
	
})

.controller('userEditController', function(User, $routeParams){
	var vm = this;
	
	vm.type = 'edit';
	
	User.get($routeParams.user_id)
	.success(function(data){
		vm.userData = data;
	});
	
	vm.saveUser = function(){
		vm.processing = true;
		vm.message = '';
		
		User.update($routeParams.user_id, vm.userData)
		.success(function(data){
			vm.processing = false;
			vm.userData = {};
			vm.message = data.message;
		});
	};
})