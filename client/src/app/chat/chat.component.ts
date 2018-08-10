import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message, Member} from '../massage.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  msg = '';
  members = [];
  activeMember = '';
  sender: Member;
  recivier: Member;

  private socket$: WebSocketSubject<any>;

  serverMessages = new Array<Message>();


  constructor() {
    this.socket$ = WebSocketSubject.create('ws://localhost:8888');
    this.socket$.subscribe(
      (data) => {
        if (data.members) {
          this.members = data.members;
        } else if (data.member) {
          if (!this.sender) {
            this.sender = data.member;
            this.activeMember = data.member;
          }
        } else {
          console.log(data);
          this.serverMessages.push(data);
        }
      },
      (error) => console.error(error),
      () => console.warn('Completed!')
    );
  }

  ngOnInit() {
  }
  send(): void {
    const messageToSend = this.msg.trim();

    if (messageToSend) {
      const message = new Message(messageToSend, this.sender, this.recivier, true);
      this.serverMessages.push(message);
      this.socket$.next(<any>JSON.stringify(message));
      this.msg = '';
    }
  }

  isMine(message: Message): boolean {
    return message && message.sender === this.sender;
}

  getActive(member): void {
    this.activeMember = member;
    this.recivier = member;
    this.serverMessages = [];
  }

}
