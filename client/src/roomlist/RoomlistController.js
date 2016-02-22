"use strict";

angular.module("ChatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "theUser",
	function RoomlistController($scope, $location, ChatResource, theUser) {
		//check if user is logged in
		if(!theUser.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}

		var socket = io.connect('http://localhost:8080');
		$scope.user = theUser.username;
		$scope.roomlist = [];
		$scope.roomkey = '';
		

		socket.on("roomlist", function(roomlistFromServer) {
			$scope.$apply(function() {
				$scope.roomlist = roomlistFromServer;
				console.log(roomlistFromServer);
			});
		});

		ChatResource.getRoomlist();


		$scope.onChangeUsername = function changeUsername() {
			$scope.user = $scope.changedUsername;
			$scope.changedUsername = null;
		};

		$scope.onCreateRoom = function onCreateRoom() {
			$location.path("/room/" + $scope.createRoomTextbox);
			$location.replace();
		};

/*
		$scope.onCreateRoom = function createRoom() {
			console.log($scope.roomlist);

			if ($scope.roomName === "") {
				$scope.errorMessage = "ERROR: put the name in the textbox or it gets the hose again!";
			}
			else {
				ChatResource.createRoom(function(success, reason) {
					if(!success) {
						$scope.$apply(function() {
							$scope.errorMessage = "ERROR: failed to create room!!!!! :[";
						});
						console.log(reason);
					}
					else {
						ChatResource.getRoomlist();
						console.log($scope.roomlist);
					}
				});
			}
			
		};

		$scope.onJoinRoom = function joinRoom(roomid) {
			ChatResource.joinRoom($scope.theRoom, function(success, reason) {
				if(!success) {
					$scope.$apply(function() {
						$scope.errorMessage = "ERROR: failed to join room!!!!! :(";
					});
					console.log(reason);
				}
				else {
					$scope.$apply(function() {
						console.log(roomid);
						$location.path("/rooms/" + roomid);
						$location.replace();
					});
				}
			});
		};

		*/
	}
]);

