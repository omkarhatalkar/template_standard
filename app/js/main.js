var myApp = angular.module('myApp', []);

myApp.controller('appController', ['$scope', function ($scope) {
	$scope.message = "welcome to my app";
}]);


