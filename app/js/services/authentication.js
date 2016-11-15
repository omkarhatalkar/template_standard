myApp.factory('Authentication', 
	['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 
	function($rootScope, $firebaseAuth, $firebaseObject, $location){
	

    $rootScope.authObj = $firebaseAuth();

	$rootScope.authObj.$onAuthStateChanged(function (firebaseUser) {
		if (firebaseUser) {
			var userRef = firebase.database().ref('users').child(firebaseUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		} else {
			$rootScope.currentUser = '';
		};
	});    

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

		logout: function (user) {
			$rootScope.currentUser  = $rootScope.message = '';			
			return $rootScope.authObj.$signOut();
		}, // Logout

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
				
				$location.path('/success');
				$rootScope.message = "User " + firebaseUser.uid + " created successfully!";
	    		// console.log("User " + firebaseUser.uid + " created successfully!");
			}).catch(function (error) {
				$rootScope.message = error;
				console.error("Error: ", error);
			});
		} // Register		
	}; // return
}]); // Factory