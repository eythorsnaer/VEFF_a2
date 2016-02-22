"use strict";

angular.module("ChatApp").controller("LoginController", ["$scope", "$location", "ChatResource", "theUser",
	function LoginController($scope, $location, ChatResource, theUser) {

		$scope.user = "";
		$scope.errorMessage = "";
		
		$scope.onLogin = function onLogin() {
			ChatResource.login($scope.user, function(success) {
				if(!success) {
					$scope.$apply(function() {
						$scope.errorMessage = "Innskráning mistókst";
					});
				} 
				else {
					$scope.$apply(function() {
						theUser.username = $scope.user;
						theUser.isLoggedIn = true;
						$location.path("/rooms");
						$location.replace();
					});
				}
			});
		};
	}
]);