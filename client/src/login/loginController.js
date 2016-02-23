"use strict";

angular.module("ChatApp").controller("LoginController", ["$scope", "$location", "ChatResource", "userData",
	function LoginController($scope, $location, ChatResource, userData) {

		console.log(userData);
		if(userData.isLoggedIn) {
			$location.path("/rooms");
			$location.replace();
		}

		$scope.user = "";
		$scope.errorMessage = "";
		
		$scope.onLogin = function onLogin() {
			ChatResource.login($scope.user, function(success) {
				if(!success) {
					$scope.$apply(function() {
						$scope.errorMessage = "ERROR: failed to login!!!!! :p";
					});
				} 
				else {
					$scope.$apply(function() {
						userData.username = $scope.user;
						userData.isLoggedIn = true;
						$location.path("/rooms");
						$location.replace();
					});
				}
			});
		};
	}
]);