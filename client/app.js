angular.module("ChatWebApp", []);

angular.module("ChatWebApp").controller("ChatController", 
function ChatController($scope, BACKEND_URL){
	$scope.message = "Hello world!";
});

angular.module("ChatWebApp").constant("BACKEND_URL", "http://localhost:8080");