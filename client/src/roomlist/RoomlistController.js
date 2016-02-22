"use strict";

angular.module("ChatApp").controller("RoomlistController", ["$scope", "$location", "ChatResource", 
	function RoomlistController($scope, $location, ChatResource) {

		

		$scope.changeUsername = function changeUseername() {
			$scope.user = $scope.changedUsername;
			$scope.changedUsername = null;
		};

		//$scope.user = "BjarturSmjartur";
		var socket = io.connect('http://localhost:8080');

		socket.on("getRoomList", function(roomlist) {
			$scope.$apply(function() {
				$scope.roomlist = roomlist;
			});
		});

		$scope.roomlist = [{
			name: "umræður um lomma",
			id: 1
		}, {
			name: "umræður um homma",
			id: 2
		}];
	}
]);

