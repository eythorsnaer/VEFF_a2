"use strict";

angular.module("ChatApp").controller("LoginController", ["$scope", "$location", "ChatResource",
	function LoginController($scope, $location, ChatResource) {

		$scope.user = "";
		//$scope.pass = "";
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
						$location.path("/rooms");
						$location.replace();
					});
				}
			});
		};
	}
]);