Run gulp in client folder

Run chatserver in chatserver folder

Run SimpleHTTPServer in client folder

Test in Google Chrome

#Features (65%):
"Login" with nickname

Display list of active chat rooms

Create chat room

Join chat room

Leave chat room

Send message

Display old messages

Display new messages in real time

Send private message to another user

Creator of room can kick a user from the room

A kicked user can re-enter room

Creator of room can ban a user from the room

A banned user cannot re-enter room

#Technical (35%):
Each component (controller, factory, etc.) should be in a single file, but the files should be concatenated and minified when prepared for production, by using a grunt (or gulp) task.

All external dependencies (AngularJS etc.) should be installed using bower (EDIT: or npm)

The code should go through JSHint/JSLint without warnings. A grunt or gulp file should be included to ensure running jshint/jslint is easy.
