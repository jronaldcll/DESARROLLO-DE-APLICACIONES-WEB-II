import { NgClass } from '@angular/common';
import { Component, input, output , ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgScrollbar } from 'ngx-scrollbar';

export interface Message {
  sender: string;
  text: string;
  time: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chat-widget',
  imports: [
    NgScrollbar,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent {
  readonly avatar = input<string>('assets/images/user/user3.jpg');
  readonly userName = input<string>('Aiden Chavez');
  readonly newMessagesCount = input<number>(0);

  readonly messages = input<Message[]>([]);
  readonly messageSent = output<string>();

  messageText: string = '';

  sendMessage() {
    if (this.messageText.trim()) {
      const newMessage: Message = {
        sender: this.userName(),
        text: this.messageText,
        time: new Date().toLocaleTimeString(),
      };
      this.messages().push(newMessage);
      this.messageSent.emit(this.messageText);
      this.messageText = '';
    }
  }
}
