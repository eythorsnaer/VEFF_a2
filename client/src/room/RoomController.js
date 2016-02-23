angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "$location", "theUser", "ChatResource", 
	function RoomController($scope, $routeParams, $location, theUser, ChatResource) {
		//check if user is logged in
		if(!theUser.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}

		var socket = io.connect('http://localhost:8080');
		$scope.newMessage = "";
		$scope.messageList = [];
		$scope.userList = [];
		$scope.opList = [];
		$scope.errorMessage = "";
		

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
			if($scope.newMessage.substring(0, 8) === "/whisper") {
				var userToPM = $scope.newMessage.replace("/whisper ", "");
				var msg = userToPM;
				userToPM = userToPM.substr(0, userToPM.indexOf(' '));
				msg = msg.substr(msg.indexOf(' '));

				console.log(msg);
				console.log(userToPM);

				ChatResource.sendPrivateMessage(msg, userToPM, function(success) {
					if(!success) {
						$scope.errorMessage = "ERROR: failed to pm: " + userToPM ;
					}
					else {
						$scope.newMessage = null;
					}
				});
			}
			else {
				ChatResource.sendMessage($scope.newMessage, $routeParams.id);
				$scope.newMessage = null;
			}
		};

		//send private message
		$scope.onPrivateMessage = function onPrivateMessage(user) {
			$scope.newMessage = "/whisper " + user + " ";
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