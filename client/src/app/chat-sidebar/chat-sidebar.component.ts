import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit {

@Input() members: {name: string, image: string, isOnline: boolean}[] ;
@Output() memberClick = new EventEmitter<boolean>();

isOnlineList = true;
searchValue: string;

  constructor() { }

  ngOnInit() {
  }

  getOnlineMembersList() {
   return  this.searchValue
    ? this.members.filter((member) => {
      const name = member.name.toLowerCase();
      return name.indexOf(this.searchValue.toLowerCase()) !== -1;
    })
    : this.isOnlineList === true ?
      (this.members.filter((member) => member.isOnline === true))
    : this.members;

  }

  findMember(name) {
    console.log(name);
    this.searchValue = name.toLowerCase();
  }

  getOnlineList() {
    this.isOnlineList = true;
  }
  getAllList() {
    this.isOnlineList = false;
  }
  getActive(member) {
    this.memberClick.emit(member);
  }

}


