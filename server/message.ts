import {Member} from './members'
export function sendMessage(
    content = "",
    sender?: Member,
    reciever?: Member,
    isOnline?: boolean
  ): string {
    return JSON.stringify(new Message(content, sender, reciever, isOnline));
  }
  
  export class Message {
    constructor(
      public content = "",
      public sender?: Member,
      public recivier?: Member,
      public isOnline?: boolean
    ) {}
  }
  