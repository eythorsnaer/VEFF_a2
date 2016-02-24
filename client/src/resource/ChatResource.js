"use strict";

angular.module("ChatApp").factory("ChatResource",  
function ChatResource() {

	var socket = io.connect('http://localhost:8080');

	return {
		login: function login(nick, callback) {
			socket.emit("adduser", nick, function(available){
				if (available) {
					callback(true);
				}
				else {
					callback(false);
				}

			});
		},

		getRoomlist: function getRoomList() {
			socket.emit("rooms");
		},

		joinRoom: function joinRoom(roomID, callback) {
			var roomInfo ={room: roomID};

			socket.emit("joinroom", roomInfo, function(success, reason){
				if (success)
				{
					callback(true, reason);
				}
				else
				{
					callback(false, reason);
				}
			});
		},

		leaveRoom: function leaveRoom(roomID, callback) {
			socket.emit("partroom", roomID);
			callback();
		},
 
		sendMessage: function sendMessage(message, roomID) {
			var messageInfo = {roomName: roomID, msg: message};

			socket.emit("sendmsg", messageInfo);
		},

		sendPrivateMessage: function sendPrivateMessage(msg, user, callback) {
			var messageInfo = {nick: user, message: msg};
			console.log("inside chatRes");
			console.log(messageInfo);
			socket.emit("privatemsg", messageInfo, function(success){
				if (success)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}
			});
		},

		getUserList: function getUserList() {
			socket.emit("users");
		},

		kickUser: function kickUser(nick, roomID, callback) {
			var userInfo = {user: nick, room: roomID};

			socket.emit("kick", userInfo, function(success){
				if (success)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}
			});
		},

		banUser: function banUser(nick, roomID, callback) {
			var userInfo = {user: nick, room: roomID};

			socket.emit("ban", userInfo, function(success){
				if (success)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}
			});
		},

		opUser: function opUser(nick, roomID, callback) {
			var userInfo = {user: nick, room: roomID};

			socket.emit("op", userInfo, function(success){
				if (success)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}
			});
		},

		logout: function logout(callback) {
			socket.emit("disconnect");
			callback();
		}
	};
});