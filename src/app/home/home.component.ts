import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
isChatOpen:boolean=false;
toggleChat(){
  this.isChatOpen=!this.isChatOpen;
}
}
