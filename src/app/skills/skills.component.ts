import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  scrollPercent = 0;
  showResume = false;
  constructor(private matDialog: MatDialog) {

  }
  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    this.scrollPercent = (scrollTop / docHeight) * 100;
  }

  openChat() {
    this.matDialog.open(ChatComponent, {
      width: '320px',
      height: '450px',
      position: {
        bottom: '20px',
        right: '20px'
      },

      panelClass: 'chat-dialog'
    })
  }

  resumeDownload =
'https://drive.google.com/uc?export=download&id=1c38uhTFjF62ytQ_kCE1-lxgbJ17JlGl5';

downloadResume() {
  window.open(this.resumeDownload, '_blank');
}
}