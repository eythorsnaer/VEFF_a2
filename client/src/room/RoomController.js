angular.module("ChatApp").controller("RoomController", ["$scope", "$routeParams", "$location", 
	function RoomController($scope, $routeParams, $location) {
		var id = $routeParams.id;

		var queryString = $location.search();
	}
]);