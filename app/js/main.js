

var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (event, next, previous, error) {
		if (error=='AUTH_REQUIRED') {
			$rootScope.message = "Sorry, you must log in to access that page";
			$location.path('/login');
		};//Auth_REQ
	});//Even info
}]);//Run


myApp.config(['$routeProvider', function ($routeProvider) {

	 // Initialize Firebase
	var config = {
		apiKey: "AIzaSyARKry8wwgcLTF0VhT5Cjz5e6ZU-IcB8qs",
		authDomain: "registration-d0f3e.firebaseapp.com",
		databaseURL: "https://registration-d0f3e.firebaseio.com",
		storageBucket: "registration-d0f3e.appspot.com",
		messagingSenderId: "795797679986"
	};
	firebase.initializeApp(config);
	
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/success', {
			templateUrl: 'views/success.html',
			controller: 'SuccessController',
			resolve: {
				currentAuth: function (Authentication) {
					return Authentication.requireAuth();
				} // Current Auth
			} // Resolve
		}).
		otherwise({
			redirectTo: '/login'
		});

}]);



