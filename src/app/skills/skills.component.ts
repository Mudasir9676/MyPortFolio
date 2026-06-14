import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  scrollPercent = 0;
  showResume = false;
  showMobileNav = false;
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
 chatBoxOpen = false;
  openChat() {
     this.chatBoxOpen = true;

  this.dialogRef = this.matDialog.open(ChatComponent, {
    position: {
      bottom: '20px',
      right: '20px'
    },
    // padding: '10px'
    backdropClass: 'custom-dialog-backdrop',
    panelClass: 'custom-dialog-panel'
  });
}
  resumeDownload =
'https://drive.google.com/uc?export=download&id=1c38uhTFjF62ytQ_kCE1-lxgbJ17JlGl5';

downloadResume() {
  window.open(this.resumeDownload, '_blank');
}

openEmail() {
  window.location.href =
    'mailto:shaikmudasir12@gmail.com?subject=Opportunity%20for%20Angular%20Full%20Stack%20Developer&body=Hi%20Mudusir%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20potential%20opportunity%20for%20an%20Angular%20Full%20Stack%20Developer.%20Please%20share%20your%20availability.%0A';
}

toggleMobileNav() {
  this.showMobileNav = !this.showMobileNav;
}

closeMobileNav() {
  this.showMobileNav = false;
}
dialogRef!: MatDialogRef<ChatComponent>;
closeChat() {
  this.chatBoxOpen = false;
  this.dialogRef?.close();
}
}