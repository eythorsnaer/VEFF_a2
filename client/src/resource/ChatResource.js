angular.module("ChatApp").factory("ChatResource"; 
function ChatResource() {
	return {
		login: function login(nick) {
			socket.emit("adduser", nick, function(available){
				if (!available){
					// TODO: Error handling
				}
			});
		},

		getRoomList: function getRoomList() {
			socket.emit("rooms"){
				// TODO Capture Event
			};
		},

		createRoom: function createRoom() {
			var roomInfo = {room: undefined};

			socket.emit("joinroom", roomInfo, function(available, reason)){
				// TODO: Error handling, catch events
			};
		},

		joinRoom: function joinRoom(roomID) {
			var roomInfo ={room: roomID};

			socket.emit("joinroom", roomInfo, function(available, reason)){
				// TODO: Error handling, catch events
			};
		},

		leaveRoom: function leaveRoom(roomID) {
			socket.emit("partroom", roomID){
				// TODO: Catch event
			};
		},
 
		sendMessage: function sendMessage(message, roomID) {
			var messageInfo = {roomName: roomID, msg: message};

			socket.emit("sendmsg", messageInfo){
				// TODO: Catch event
			};
		},

		sendPrivateMessage: function sendPrivateMessage(message, user) {
			var messageInfo = {nick: user, msg: message};

			socket.emit("sendmsg", messageInfo, function(available)){
				// TODO: Error handling, catch event
			};
		},

		getUserList: function getUserList() {
			socket.emit("users"){
				// TODO: Catch event
			};
		},

		kickUser: function kickUser(nick, roomID) {
			var userInfo = {user: nick, room: roomID};

			socket.emit("kick", userInfo, function(available)){
				// TODO: Catch events, error handling
			};
		},

		banUser: function banUser(nick, roomID) {
			var userInfo = {user: nick, room: roomID};

			socket.emit("ban", userInfo, function(available)){
				// TODO: Catch events, error handling
			};
		},

		exit: function exit() {
			socket.emit("disconnect"){
				// TODO: Catch events
			};
		}
	}
});