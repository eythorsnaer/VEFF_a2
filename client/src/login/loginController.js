"use strict";

angular.module("ChatApp").controller("LoginController", ["$scope", "$location", 
	function LoginController($scope, $location) {

		$scope.user = "";
		$scope.pass = "";
		$scope.errorMessage = "";
/*
		$scope.onLogin = function onLogin() {
			 
			socket.emit("adduser", $scope.user, function() {			
				$scope.loggedIn = true;
				$location("/rooms");
			});

		};

		
		$scope.onLogin = function onLogin() {
			ChatRescource.login($scope.user, $scope.pass, funciton(success)) {
				if(!success) {
					$scope.errorMessage = "Innskráning mistókst";
				} 
				else {
					socket.emit("adduser", $scope.user, function(available) {
						if(available) {
							$scope.loggedIn = true;
							socket.emit("rooms");
						}
					});

					$location("/rooms");
				}
			})
		};
		*/
		
	}
]);