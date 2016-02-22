"use strict";

angular.module("ChatApp", ['ngRoute', 'ng']).config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	})
	.when("/rooms", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/room/:id", {
		templateUrl: "src/room/room.html",
		controller: "RoomController"
	}).otherwise({ redirectTo: "/login" });
}]).value("theUser", {
	username: "",
	isLoggedIn: false
});
