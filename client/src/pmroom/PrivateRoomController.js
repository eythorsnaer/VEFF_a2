angular.module("ChatApp").controller("PrivateRoomController", ["$scope", "$routeParams", "$location", "userData", "ChatResource", 
	function PrivateRoomController($scope, $routeParams, $location, userData, ChatResource) {
		//check if user is logged in
		if(!userData.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}
		if ($routeParams.id === userData.username) {
			$location.path("/rooms");
			$location.replace();
		}

		var socket = io.connect('http://localhost:8080');
		$scope.otherUser = $routeParams.id;
		$scope.thisUser = userData.username;
		$scope.newPM = "";
		$scope.PMList = {};

		$scope.onSendPM = function onSendPM() {
			ChatResource.sendPrivateMessage($scope.newPM, $scope.thisUser, function(success) {
				if(!success) {
					$scope.errorMessage = "ERROR: failed to pm: " + $scope.userToPM;
				}
				else {
					$scope.newPM = "";
					$scope.userToPM = "";
				}
			});	
		};

		socket.on("recv_privatemsg", function(user, message) {
			if (userData.privateMessages[user] === undefined) {
				userData.privateMessages[user] = [];
			}

			userData.privateMessages.push({
				timestamp: Date.now(), 
				nick: user, 
				msg: message,
			});

			$scope.$apply(function() {
				$scope.PMList = userData.privateMessages;
			});
		});
	}
]);