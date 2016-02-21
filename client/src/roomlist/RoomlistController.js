angular.module("ChatApp").controller("RoomlistController", ["$scope", "$location", 
	function RoomlistController($scope, $location) {

		$scope.roomlist = [{
			name: "room 1",
			id: 1
		}, {
			name: "room 2",
			id: 1
		}]
	}
]);