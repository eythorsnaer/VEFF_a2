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

		$scope.onLogout = function onLogout() {
			ChatResource.logout(function() {
				theUser.username = "";
				theUser.isLoggedIn = false;
				$location.path("/login");
				$location.replace();
			});
		};

	}
]);

