// Factory for socket
// Taken from Brian Ford
// http://briantford.com/blog/angular-socket-io.html
angular.module('ChatApp').factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost:8080');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        getSocket: function() {
            return socket;
        }
    };
}]);