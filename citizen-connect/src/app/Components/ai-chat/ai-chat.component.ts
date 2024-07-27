import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AiChatComponent implements OnInit {
  documentTitle: string = '';
  model: string = 'gpt-3.5';
  messages: { sender: string, content: string }[] = [];
  userMessage: string = '';
  chatHistory: { user: string, ai: string }[] = [];
  userId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.documentTitle = params['title'] || 'Document';
    });

    // Simulating dynamic userId retrieval (replace with actual implementation)
    this.userId = '32deda4e-5f33-441a-b994-4d8fece711cb'; // Replace with dynamic retrieval logic
  }

  switchModel(model: string): void {
    this.model = model;
  }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      const userMessage = this.userMessage;
      this.messages.push({ sender: 'User', content: userMessage });
      this.userMessage = '';

      // Send message to Flask API
      this.getAIResponse(userMessage).subscribe(response => {
        this.messages.push({ sender: 'AI', content: response.response });
        this.chatHistory.push({ user: userMessage, ai: response.response });
      });
    }
  }

  getAIResponse(message: string): Observable<any> {
    const url = 'http://127.0.0.1:5000/pdf-chat'; // Your Flask endpoint
    const body = {
      userId: this.userId, // Dynamic userId
      pdfTitle: this.documentTitle,
      query: message
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });
  }
}
