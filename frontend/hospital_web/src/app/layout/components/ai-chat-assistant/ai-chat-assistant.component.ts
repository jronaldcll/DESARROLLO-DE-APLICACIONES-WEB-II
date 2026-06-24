import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgScrollbar } from 'ngx-scrollbar';
import { AiService } from '@core/service/ai.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  time: Date;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ai-chat-assistant',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatCardModule, 
    MatTooltipModule,
    NgScrollbar,
    DragDropModule
  ],
  templateUrl: './ai-chat-assistant.component.html',
  styleUrls: ['./ai-chat-assistant.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AiChatAssistantComponent {
  private aiService = inject(AiService);
  
  isOpen = false;
  userInput = '';
  isTyping = false;
  
  messages: Message[] = [
    { text: 'Hello! I am your Cliniva AI Assistant. How can I help you today?', sender: 'ai', time: new Date() }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ text: userMsg, sender: 'user', time: new Date() });
    this.userInput = '';
    this.isTyping = true;

    this.aiService.postPrompt(userMsg).subscribe({
      next: (res: string) => {
        this.messages.push({ text: res, sender: 'ai', time: new Date() });
        this.isTyping = false;
      },
      error: () => {
        this.messages.push({ 
          text: 'I am sorry, I am having trouble connecting. Please check your AI settings.', 
          sender: 'ai', 
          time: new Date() 
        });
        this.isTyping = false;
      }
    });
  }

  quickAction(action: string) {
    this.userInput = action;
    this.sendMessage();
  }
}
