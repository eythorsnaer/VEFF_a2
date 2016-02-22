"use strict";angular.module("ChatApp",["ngRoute","ng"]).config(["$routeProvider",function(o){o.when("/login",{templateUrl:"src/login/login.html",controller:"LoginController"}).when("/rooms",{templateUrl:"src/roomlist/roomlist.html",controller:"RoomlistController"}).when("/rooms/:id",{templateUrl:"src/roomlist/room.html",controller:"RoomController"}).otherwise({redirectTo:"/index"})}]);
angular.module("ChatApp").factory("socket",["$rootScope",function(n){var t=io.connect("http://localhost:8080");return{on:function(o,c){t.on(o,function(){var o=arguments;n.$apply(function(){c.apply(t,o)})})},emit:function(o,c,a){t.emit(o,c,function(){var o=arguments;n.$apply(function(){a&&a.apply(t,o)})})},getSocket:function(){return t}}}]);
<<<<<<< HEAD
"use strict";angular.module("ChatApp").controller("LoginController",["$scope","$location","ChatResource",function(n,o,r){n.user="",n.errorMessage="",n.onLogin=function(){r.login(n.user,function(r){r?n.$apply(function(){o.path("/rooms"),o.replace()}):n.$apply(function(){n.errorMessage="Innskráning mistókst"})})}}]);
angular.module("ChatApp").controller("RoomController",["$scope","$routeParams","$location",function(o,r,a){r.id,a.search()}]);
"use strict";angular.module("ChatApp").factory("ChatResource",function(){var o=io.connect("http://localhost:8080");return{login:function(n,t){o.emit("adduser",n,function(o){t(o?!0:!1)})},getRoomList:function(){o.emit("rooms")},createRoom:function(){var n={room:void 0};o.emit("joinroom",n,function(o,n){})},joinRoom:function(n){var t={room:n};o.emit("joinroom",t,function(o,n){})},leaveRoom:function(n){o.emit("partroom",n)},sendMessage:function(n,t){var i={roomName:t,msg:n};o.emit("sendmsg",i)},sendPrivateMessage:function(n,t){var i={nick:t,msg:n};o.emit("sendmsg",i,function(o){})},getUserList:function(){o.emit("users")},kickUser:function(n,t){var i={user:n,room:t};o.emit("kick",i,function(o){})},banUser:function(n,t){var i={user:n,room:t};o.emit("ban",i,function(o){})},exit:function(){o.emit("disconnect")}}});
"use strict";angular.module("ChatApp").controller("RoomlistController",["$scope","$location","ChatResource",function(o,n,e){o.changeUsername=function(){o.user=o.changedUsername,o.changedUsername=null};var t=io.connect("http://localhost:8080");t.on("getRoomList",function(n){o.$apply(function(){o.roomlist=n})}),o.roomlist=[{name:"umræður um lomma",id:1},{name:"umræður um homma",id:2}]}]);
=======
"use strict";angular.module("ChatApp").controller("LoginController",["$scope","$location",function(o,e){o.user="",o.pass="",o.errorMessage="",o.onLogin=function(){socket.emit("adduser",o.user,function(){o.loggedIn=!0,e("/rooms")})}}]);

"use strict";function ChatResource(){return{login:function(o,e){socket.emit("adduser",o,function(o){e(o?!0:!1)})},getRoomList:function(o){socket.emit("rooms"),socket.on("roomlist"),o()},createRoom:function(o){var e={room:void 0};socket.emit("joinroom",e,function(e,t){e?o(!0,t):o(!1,t)}),socket.on("updateusers"),socket.on("servermessage"),socket.on("updatechat")},joinRoom:function(o,e){var t={room:o};socket.emit("joinroom",t,function(o,t){o?e(!0,t):e(!1,t)}),socket.on("updateusers"),socket.on("servermessage")},leaveRoom:function(o,e){socket.emit("partroom",o),socket.on("updateusers"),socket.on("servermessage"),e()},sendMessage:function(o,e,t){var s={roomName:e,msg:o};socket.emit("sendmsg",s),socket.on("updatechat"),t()},sendPrivateMessage:function(o,e,t){var s={nick:e,msg:o};socket.emit("sendmsg",s,function(o){t(o?!0:!1)}),socket.on("recv_privatemsg")},getUserList:function(o){socket.emit("users"),socket.on("userlist"),o()},kickUser:function(o,e,t){var s={user:o,room:e};socket.emit("kick",s,function(o){t(o?!0:!1)}),socket.on("kicked"),socket.on("updateusers")},banUser:function(o,e,t){var s={user:o,room:e};socket.emit("ban",s,function(o){t(o?!0:!1)}),socket.on("banned"),socket.on("updateusers")},logout:function(o){socket.emit("disconnect"),o()}}}var socket=io.connect("http://localhost:8080");angular.module("ChatApp").factory("ChatResource");
angular.module("ChatApp").controller("RoomlistController",["$scope","$location",function(o,l){o.roomlist=[{name:"room 1",id:1},{name:"room 2",id:1}]}]);
>>>>>>> 07c6ea411f1d4cda1b35b943fc046bd9f87956c1
