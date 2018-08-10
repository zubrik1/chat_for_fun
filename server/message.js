"use strict";
exports.__esModule = true;
function sendMessage(content, sender, reciever, isOnline) {
    if (content === void 0) { content = ""; }
    return JSON.stringify(new Message(content, sender, reciever, isOnline));
}
exports.sendMessage = sendMessage;
var Message = /** @class */ (function () {
    function Message(content, sender, recivier, isOnline) {
        if (content === void 0) { content = ""; }
        this.content = content;
        this.sender = sender;
        this.recivier = recivier;
        this.isOnline = isOnline;
    }
    return Message;
}());
exports.Message = Message;
