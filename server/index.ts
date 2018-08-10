import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { Member, members } from "./members";
import { Message, sendMessage } from "./message";
import { mongoURI } from "./config/keys";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8888;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// mongoose.connect(mongoURI, { useNewUrlParser: true })
// 	.then(()=> console.log('Mongo connected!'))
// 	.catch((error: Error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// router.get('/', controller.login);
// router.post('/', controller.login);

interface ExtWebSocket extends WebSocket {
  member: any;
}
let count = 1;

wss.on("connection", (ws: ExtWebSocket) => {
  const member: Member = {
    name: `User ${count}`,
    image: "http://pantikapei.ru/wp-content/uploads/2012/03/11b442d2c9ef.jpg",
    isOnline: true
  };
  ws.member = member;
  count++;
  members.push(member);
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ members: members }));
    client.send(JSON.stringify({ member: member }));
  });

  ws.on("message", (msg: string) => {
    const message = JSON.parse(msg) as Message;
    wss.clients.forEach((client: any) => {
      if (message.recivier && client.member.name === message.recivier.name) {
        setTimeout(() => {
        client.send(sendMessage(message.content, message.sender, message.recivier, true))}, 1000
        );
      }
      if(message.recivier && message.recivier.name === 'Echo Bot'){
        ws.send(sendMessage(message.content, message.recivier, message.sender, true)
        );
      }
    
    if(message.recivier && message.recivier.name === 'Reverse Bot'){
        const reverseMsg = message.content.split('').reverse().join('');
        setTimeout(() => {
          ws.send(sendMessage(reverseMsg, message.recivier, message.sender, true));
        }, 3000)
      }
    
    if(message.recivier && message.recivier.name === 'Spam Bot'){
        const timer = (Math.random() * (120 - 10) + 10)*1000;
        setInterval(() => {
          ws.send(sendMessage('Do you like spam?', message.recivier, message.sender, true));
        }, timer)
      }
    
    if(message.recivier && message.recivier.name === 'Ignore Bot'){
       return;
      }
    });

    
  });

  ws.on("close", () => {
    member.isOnline = false;
    wss.clients.forEach(client => {
      client.send(JSON.stringify({ members: members }));
    });
  });

  setTimeout(() => {
    ws.send(sendMessage(`Hi there, in our awesome chat!`));
  }, 1000);

  setTimeout(() => {
    ws.send(sendMessage(`Find a interlocator and begin chating!`));
  }, 2000);

  ws.on("error", err => {
    console.warn(`Client disconnected - reason: ${err}`);
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port} :)`);
});
