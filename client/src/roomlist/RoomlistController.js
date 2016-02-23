"use strict";

angular.module("ChatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", "userData",
	function RoomlistController($scope, $location, ChatResource, userData) {
		//check if user is logged in
		if(!userData.isLoggedIn) {
			$location.path("/login");
			$location.replace();
		}

		var socket = io.connect('http://localhost:8080');
		$scope.user = userData.username;
		$scope.roomlist = [];
		$scope.roomkey = '';
		
		ChatResource.getRoomlist();

		socket.on("roomlist", function(roomlistFromServer) {
			$scope.$apply(function() {
				$scope.roomlist = roomlistFromServer;
			});
		});
/*

		$scope.onChangeUsername = function changeUsername() {
			$scope.user = $scope.changedUsername;
			$scope.changedUsername = null;

		};
*/

		$scope.onCreateRoom = function onCreateRoom() {
			$location.path("/room/" + $scope.createRoomTextbox);
			$location.replace();
		};

		$scope.onLogout = function onLogout() {
			ChatResource.logout(function() {
				userData.username = "";
				userData.isLoggedIn = false;
				$location.path("/login");
				$location.replace();
			});
		};

	}
]);

