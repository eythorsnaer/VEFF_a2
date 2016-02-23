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
	}).when("/pmroom/:id", {
		templateUrl: "src/pmroom/privateroom.html",
		controller: "PrivateRoomController"
	}).otherwise({ redirectTo: "/login" });
}]).value("userData", {
	username: "",
	privateMessages: [],
	isLoggedIn: false
});
