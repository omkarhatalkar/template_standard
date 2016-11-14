
myApp.factory('Authentication', 
	['$rootScope', '$firebaseAuth', '$location', 
	function($rootScope, $firebaseAuth, $location){
	

    $rootScope.authObj = $firebaseAuth();

	return {
		login: function (user) {

			$rootScope.authObj.$signInWithEmailAndPassword(user.email, user.password)
			.then(function (firebaseUser) {
				$location.path('/success');
			}).catch(function (error) {				
				$rootScope.message = error;
				console.error("Error: ", error);
			});
		}, // Login

		register: function (user) {
			$rootScope.authObj.$createUserWithEmailAndPassword(user.email, user.password)
			.then(function (firebaseUser) {
				var regRef = firebase.database().ref('users').child(firebaseUser.uid).set({
					date: firebase.database.ServerValue.TIMESTAMP,
					regUser: firebaseUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				}); //user info

				$rootScope.message = "User " + firebaseUser.uid + " created successfully!";
	    		console.log("User " + firebaseUser.uid + " created successfully!");
			}).catch(function (error) {
				$rootScope.message = error;
				console.error("Error: ", error);
			});
		} // Register		
	}; // return
}]); // Factory