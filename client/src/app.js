"use strict";

angular.module("ChatApp", ['ngRoute', 'ng']).config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})
	.when("/rooms", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/rooms/:id", {
		templateUrl: "src/roomlist/room.html",
		controller: "RoomController"
	}).otherwise({ redirectTo: "/index" });
}]);
