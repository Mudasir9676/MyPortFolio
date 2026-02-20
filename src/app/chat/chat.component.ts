import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput = signal('');
  messages = signal<{ text: string, user: boolean }[]>([]);

  constructor(private http: HttpClient) { }

  sendMessage() {
    console.log("send is clciced")
    const question = this.userInput();
    if (!question.trim()) return;

    // Add user message
    this.messages.set([...this.messages(), { text: question, user: true }]);
    this.userInput.set('')

    // call backend
    this.http.post<{ answer: string }>
      ('http://localhost:5000/ask', { question })
      .subscribe({
        next: (res) => {
          this.messages.set([...this.messages(), { text: res.answer, user: false }]);
        },
        error: () => {
          this.messages.set([...this.messages(), { text: 'Error: Could not get response', user: false }]);

        }
      })




  }
}
