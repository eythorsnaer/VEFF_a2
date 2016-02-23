angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "$location", "userData", "ChatResource", 
	function RoomController($scope, $routeParams, $location, userData, ChatResource) {
		//check if user is logged in
		if(!userData.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}

		var socket = io.connect('http://localhost:8080');
		$scope.newMessage = "";
		$scope.messageList = [];

		$scope.userList = [];
		$scope.opList = [];
		$scope.errorMessage = "";
		
		ChatResource.getUserList();

		ChatResource.joinRoom($routeParams.id, function(success, reason) {
			if(!success) {
				$scope.$apply(function() {
					$scope.errorMessage = "ERROR: failed to join room!!!!! :(";
					$location.path("/rooms/");
					$location.replace();
				});
				//console.log(reason);
			}
		});

		$scope.onLeave = function onLeave() {
			ChatResource.leaveRoom($routeParams.id, function(success) {
				if(!success) {
					$scope.errorMessage = "ERROR: failed to leave room!!!!! :(";
				}
			});
		};

		//put message into db 
		$scope.onSendMessage = function onSendMessage() {
			ChatResource.sendMessage($scope.newMessage, $routeParams.id);
			$scope.newMessage = null;
		};

		//fetch new messageList when updatechat is called in sendmsg in chatserver.js
		socket.on("updatechat", function(room, messageListFromdb) {
			if (room === $routeParams.id) {
				$scope.$apply(function() {
					$scope.messageList = messageListFromdb;
				});
			}
		});



		

		socket.on("updateusers", function(room, userListFromdb, opListFromdb) {
			if (room === $routeParams.id) {
				$scope.$apply(function() {
					$scope.userList = userListFromdb;
					$scope.opList = opListFromdb;
				});
			}
		});
	}
]);