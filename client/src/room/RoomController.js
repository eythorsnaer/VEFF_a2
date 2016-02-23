angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "$location", "theUser", "ChatResource", 
	function RoomController($scope, $routeParams, $location, theUser, ChatResource) {
		//check if user is logged in
		if(!theUser.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}

		var userSendingServermessage;
		var socket = io.connect('http://localhost:8080');
		$scope.newMessage = "";
		$scope.messageList = [];
		$scope.userList = [];
		$scope.opList = [];
		$scope.errorMessage = "";
		$scope.userIsNotAdmin = true;
		

		ChatResource.joinRoom($routeParams.id, function(success, reason) {
			if(!success) {
				$scope.$apply(function() {
					$scope.errorMessage = "ERROR: failed to join room!!!!! :(";
					$location.path("/rooms/");
					$location.replace();
				});
				//console.log(reason);
			}

			userSendingServermessage = theUser.username;
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

		//kick user
		$scope.onKick = function onKick(user) {
			ChatResource.kickUser(user, $routeParams.id, function(success) {
				if(!success) {
					$scope.errorMessage = "ERROR: failed to kick: " + user;
				}
			});
		};

		//ban user
		$scope.onBan = function onBan(user) {
			ChatResource.banUser(user, $routeParams.id, function(success) {
				if(!success) {
					$scope.errorMessage = "ERROR: failed to ban: " + user;
				}
			});
		};

		//op user
		$scope.onOp = function onOp(user) {
			ChatResource.opUser(user, $routeParams.id, function(success) {
				if(!success) {
					$scope.errorMessage = "ERROR: failed to op: " + user;
				}
			});
		};

		socket.on("servermessage", function(info) {
			if (theUser.username == userSendingServermessage)
			{
				ChatResource.sendMessage(info, $routeParams.id);
				userSendingServermessage =  undefined;
			}

			console.log(info);
		});

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

					angular.forEach($scope.opList, function(op)
					{
						if (op == theUser.username)
						{
							$scope.userIsNotAdmin = false;
						}
					});
				});
			}
		});

		socket.on("kicked", function() {
			angular.forEach($scope.userList, function(user)
			{
				if (user === theUser.username)
				{
					$location.path("/rooms");
					$location.replace();
				}
			});
		});

		socket.on("banned", function() {
			angular.forEach($scope.userList, function(user)
			{
				if (user === theUser.username)
				{
					$location.path("/rooms");
					$location.replace();
				}
			});
		});
	}
]);