myApp.controller('RegistrationController', ['$scope', '$firebaseAuth', function($scope, $firebaseAuth){


    $scope.authObj = $firebaseAuth();
	
	$scope.login = function () {
		$scope.message = "Welcome  " + $scope.user.email;
	}


	$scope.register = function () {
		$scope.authObj.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
		.then(function (firebaseUser) {
			$scope.message = "User " + firebaseUser.uid + " created successfully!";
    		console.log("User " + firebaseUser.uid + " created successfully!");
		}).catch(function (error) {
			$scope.message = error;
			console.error("Error: ", error);
		});
	}



}]);