angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "$location", "theUser", "ChatResource", 
	function RoomController($scope, $routeParams, $location, theUser, ChatResource) {
		//check if user is logged in
		/*
		if(!theUser.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}
*/
		var id = $routeParams.id;
		console.log(id);

		ChatResource.joinRoom(id, function(success, reason) {
				if(!success) {
					$scope.$apply(function() {
						$scope.errorMessage = "ERROR: failed to join room!!!!! :(";
						$location.path("/rooms/");
						$location.replace();
					});
					console.log(reason);
				}
				
			});


	}
]);