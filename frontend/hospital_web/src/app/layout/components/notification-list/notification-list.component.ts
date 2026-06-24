import { CommonModule } from '@angular/common';
import { Component, OnInit, input, output , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { trigger, transition, style, animate } from '@angular/animations';

export interface Notifications {
  message: string;
  time: string;
  icon?: string;
  userImg?: string;
  color: string;
  status: string;
  id?: string; // Optional unique identifier for each notification
  actionLabel?: string; // Optional action button label
  actionType?: string; // Optional action type (e.g., 'View', 'Reply', 'Mark as Important')
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  imports: [
    MatMenuModule,
    NgScrollbar,
    FeatherIconsComponent,
    CommonModule,
    MatButtonModule,
  ],
  animations: [
    trigger('notificationAnimation', [
      transition(':leave', [
        animate(
          '0.5s ease-out',
          style({ opacity: 0, transform: 'translateX(30px)' })
        ),
      ]),
    ]),
  ],
})
export class NotificationListComponent implements OnInit {
  readonly notifications = input<Notifications[]>([]);
  readonly markAllAsRead = output<void>();
  readonly readAll = output<void>();
  readonly closeNotification = output<Notifications>();
  readonly actionClick = output<{
    notification: Notifications;
    actionType: string;
}>();

  // Track notifications being removed for animation
  removingNotification: Notifications | null = null;

  // Count of unread notifications
  unreadCount = 0;

  ngOnInit() {
    this.updateUnreadCount();
  }

  // Update the unread count based on notification status
  updateUnreadCount() {
    this.unreadCount = this.notifications().filter(
      (n) => n.status === 'msg-unread'
    ).length;
  }

  markAll() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.markAllAsRead.emit();
    // Update all notifications to read status
    this.notifications().forEach((notification) => {
      notification.status = 'msg-read';
    });
    this.updateUnreadCount();
  }

  readAllNotifications() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.readAll.emit();
    this.updateUnreadCount();
  }

  removeNotification(notification: Notifications) {
    // Set the notification as being removed for animation
    this.removingNotification = notification;

    // Mark as read first
    if (notification.status === 'msg-unread') {
      notification.status = 'msg-read';
      this.updateUnreadCount();
    }

    // Emit after a short delay to allow animation to complete
    setTimeout(() => {
      this.closeNotification.emit(notification);
      this.removingNotification = null;
    }, 500);
  }

  // Check if a notification is currently being removed
  isRemoving(notification: Notifications): boolean {
    return this.removingNotification === notification;
  }

  // Mark notification as read when clicked
  markAsRead(notification: Notifications): void {
    if (notification.status === 'msg-unread') {
      notification.status = 'msg-read';
      this.updateUnreadCount();
    }
  }

  // Handle action button click
  onActionClick(notification: Notifications) {
    this.actionClick.emit({
      notification,
      actionType: notification.actionType || 'default',
    });

    // If the notification is unread, mark it as read when action is clicked
    if (notification.status === 'msg-unread') {
      notification.status = 'msg-read';
      this.updateUnreadCount();
    }
  }
}
