angular.module('studentService', [])
.factory('Student', function($http){
	var studentFactory = {};

	//get a single student
	studentFactory.get = function(id){
		return $http.get('/api/students/' + id);
	};

	//get all students
	studentFactory.all = function(){
		return $http.get('/api/students');
	};

	//create a student
	studentFactory.create = function(studentData){
		console.log("Student data" + studentData);
		return $http.post('/api/students/', studentData);
	};

	//update a student
	studentFactory.update = function(id, studentData){
		return $http.put('/api/students/' + id, studentData);
	};

	//create a comment
	studentFactory.comment = function(id, commentData){
		return $http.post('/api/students/' + id + '/comment', commentData);
	};

	//delete a student
	studentFactory.delete = function(id) {
		return $http.delete('/api/students/' + id);
	}

	return studentFactory;
});
