"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var bodyParser = require("body-parser");
var cors = require("cors");
var members_1 = require("./members");
var message_1 = require("./message");
var app = express();
var router = express.Router();
var port = process.env.PORT || 8888;
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });
// mongoose.connect(mongoURI, { useNewUrlParser: true })
// 	.then(()=> console.log('Mongo connected!'))
// 	.catch((error: Error) => console.log(error));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var count = 1;
wss.on("connection", function (ws) {
    var member = {
        name: "User " + count,
        image: "http://pantikapei.ru/wp-content/uploads/2012/03/11b442d2c9ef.jpg",
        isOnline: true
    };
    ws.member = member;
    count++;
    members_1.members.push(member);
    wss.clients.forEach(function (client) {
        client.send(JSON.stringify({ members: members_1.members }));
        client.send(JSON.stringify({ member: member }));
    });
    ws.on("message", function (msg) {
        var message = JSON.parse(msg);
        wss.clients.forEach(function (client) {
            if (message.recivier && client.member.name === message.recivier.name) {
                setTimeout(function () {
                    client.send(message_1.sendMessage(message.content, message.sender, message.recivier, true));
                }, 1000);
            }
            if (message.recivier && message.recivier.name === 'Echo Bot') {
                ws.send(message_1.sendMessage(message.content, message.recivier, message.sender, true));
            }
            if (message.recivier && message.recivier.name === 'Reverse Bot') {
                var reverseMsg_1 = message.content.split('').reverse().join('');
                setTimeout(function () {
                    ws.send(message_1.sendMessage(reverseMsg_1, message.recivier, message.sender, true));
                }, 3000);
            }
            if (message.recivier && message.recivier.name === 'Spam Bot') {
                var timer = (Math.random() * (120 - 10) + 10) * 1000;
                setInterval(function () {
                    ws.send(message_1.sendMessage('Do you like spam?', message.recivier, message.sender, true));
                }, timer);
            }
            if (message.recivier && message.recivier.name === 'Ignore Bot') {
                return;
            }
        });
    });
    ws.on("close", function () {
        member.isOnline = false;
        wss.clients.forEach(function (client) {
            client.send(JSON.stringify({ members: members_1.members }));
        });
    });
    setTimeout(function () {
        ws.send(message_1.sendMessage("Hi there, in our awesome chat!"));
    }, 1000);
    setTimeout(function () {
        ws.send(message_1.sendMessage("Find a interlocator and begin chating!"));
    }, 2000);
    ws.on("error", function (err) {
        console.warn("Client disconnected - reason: " + err);
    });
});
server.listen(port, function () {
    console.log("Server started on port " + port + " :)");
});
