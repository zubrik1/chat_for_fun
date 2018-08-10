export interface Member {
  name: string;
  image: string;
  isOnline: boolean;
}
export class Message {
  constructor(
    public content: string,
    public sender: Member,
    public recivier: Member,
    public isOnline: true
  ) {}
}
