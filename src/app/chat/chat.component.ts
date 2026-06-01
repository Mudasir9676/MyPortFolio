import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { marked } from 'marked';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput = signal('');
  typing = signal(false);
  messages = signal<{ text: string, user: boolean }[]>([{ text: 'Type Something to know about Mudusir', user: false }]);
  // flag to block multiple API calls
  loading = signal(false);
  @ViewChild('chatInput') chatInput!: ElementRef;
  private messageSound = new Audio('assets/audio/incoming_message.mp3');
  constructor(private http: HttpClient,  private dialogRef: MatDialogRef<ChatComponent>
) { }
  ngOnInit() {
    setTimeout(() => {
          this.playMessageSound();

    }, 2000);

  }

  ngAfterViewInit() {
    this.chatInput.nativeElement.focus()
  }

  sendMessage() {
    console.log("send is clicKed")
    const question = this.userInput();
    if (!question.trim()) return;
    // Prevent sending multiple requests if previous one is in progress
    if (this.loading()) return;
    // Add user message
    this.messages.set([...this.messages(), { text: question, user: true }]);
    this.userInput.set('')
    // Set loading flag
    this.loading.set(true);

    // call backend
    this.http.post<{ answer: string }>
      (`${environment.apiUrl}/ask`, { question })
      .subscribe({
        next: (res) => {
          this.messages.set([...this.messages(), { text: res.answer, user: false }]);
          this.playMessageSound();
          this.loading.set(false);

        },
        error: () => {
          this.messages.set([...this.messages(), { text: 'Error: Could not get response', user: false }]);
          this.loading.set(false);

        }
      })

  }

  playMessageSound() {
    this.messageSound.currentTime = 0;
    this.messageSound.play().catch(() => {
      // Some browsers require user interaction first
    });
  }

  // Trigger sendMessage on Enter key
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline in input
      this.sendMessage();
    }
  }
  closeChat() {
  this.dialogRef.close();
}


}
