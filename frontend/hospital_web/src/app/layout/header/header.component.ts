import { MatToolbarModule } from '@angular/material/toolbar';
import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, DOCUMENT, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '@config';
import {
  AuthService,
  InConfiguration,
  LanguageService,
  RightSidebarService,
  Role,
} from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationListComponent } from '../components/notification-list/notification-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageListComponent } from '../components/language-list/language-list.component';
import { UserProfileMenuComponent } from '../components/user-profile-menu/user-profile-menu.component';
import { LocalStorageService } from '@shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalSearchComponent } from '../components/global-search/global-search.component';

interface Notifications {
  message: string;
  time: string;
  userImg?: string;
  actionLabel?: string;
  actionType?: string;
  icon?: string;
  color: string;
  status: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NotificationListComponent,
    MatMenuModule,
    LanguageListComponent,
    UserProfileMenuComponent,
  ],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  private rightSidebarService = inject(RightSidebarService);
  private configService = inject(ConfigService);
  private authService = inject(AuthService);
  private router = inject(Router);
  languageService = inject(LanguageService);
  private localStorageService = inject(LocalStorageService);
  private dialog = inject(MatDialog);

  public config!: InConfiguration;
  userImg?: string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement?: HTMLElement;
  isFullScreen = false;

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    { text: 'French', flag: 'assets/images/flags/france.svg', lang: 'fr' },
    { text: 'Portuguese', flag: 'assets/images/flags/portugal.svg', lang: 'pt' },
    { text: 'Arabic', flag: 'assets/images/flags/uae.svg', lang: 'ar' },
    { text: 'Chinese', flag: 'assets/images/flags/china.svg', lang: 'zh' },
    { text: 'Hindi', flag: 'assets/images/flags/india.svg', lang: 'hi' },
  ];
  notifications: Notifications[] = [
    {
      message: 'Please check your mail',
      time: '14 mins ago',
      icon: 'mail',
      color: 'notification-green',
      status: 'msg-unread',
      actionLabel: 'View',
      actionType: 'view',
    },
    {
      message: 'New Patient Added..',
      time: '22 mins ago',
      userImg: 'assets/images/user/user1.jpg',
      color: 'notification-blue',
      status: 'msg-unread',
    },
    {
      message: 'Your leave is approved!! ',
      time: '3 hours ago',
      icon: 'event_available',
      color: 'notification-orange',
      status: 'msg-read',
    },
    {
      message: 'Lets break for lunch...',
      time: '5 hours ago',
      userImg: 'assets/images/user/user2.jpg',
      color: 'notification-blue',
      status: 'msg-unread',
      actionLabel: 'Reply',
      actionType: 'reply',
    },
    {
      message: 'Patient report generated',
      time: '14 mins ago',
      icon: 'description',
      color: 'notification-green',
      status: 'msg-read',
      actionLabel: 'Download',
      actionType: 'download',
    },
    {
      message: 'Please check your mail',
      time: '22 mins ago',
      icon: 'mail',
      color: 'notification-red',
      status: 'msg-read',
    },
    {
      message: 'Salary credited...',
      time: '3 hours ago',
      userImg: 'assets/images/user/user3.jpg',
      color: 'notification-purple',
      status: 'msg-read',
      actionLabel: 'Important',
      actionType: 'mark-important',
    },
  ];
  ngOnInit() {
    this.config = this.configService.configData;
    const userRole = this.authService.currentUser().roles?.[0]?.name;
    this.userImg =
      './assets/images/user/' + this.authService.currentUser().avatar;
    this.docElement = document.documentElement;

    if (userRole === Role.Admin) {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === Role.Patient) {
      this.homePage = 'patient/dashboard';
    } else if (userRole === Role.Doctor) {
      this.homePage = 'doctor/dashboard';
    } else {
      this.homePage = 'admin/dashboard/main';
    }

    this.langStoreValue = this.localStorageService.get('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  openSearch() {
    this.dialog.open(GlobalSearchComponent, {
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'global-search-dialog',
      backdropClass: 'global-search-backdrop',
    });
  }

  onMarkAllNotificationsRead() {
    this.notifications = this.notifications.map((n) => ({
      ...n,
      status: 'msg-read',
    }));
  }

  onReadAllNotifications() {
    alert('Navigating to notifications page to read all'); // Replace with router if needed
  }

  onRemoveNotification(notification: Notifications) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  onNotificationActionClick(event: {
    notification: Notifications;
    actionType: string;
  }) {
    const { actionType } = event;

    // Handle different action types
    switch (actionType) {
      case 'view':
        // Implement view logic
        break;
      case 'profile':
        // Implement profile navigation
        break;
      case 'reply':
        // Implement reply logic
        break;
      case 'download':
        // Implement download logic
        break;
      case 'mark-important':
        // Implement importance marking
        break;
      default:
    }
  }

  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      this.localStorageService.set('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      this.localStorageService.set('collapsed_menu', 'true');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }

  onLanguageChange(item: { text: string; flag: string; lang: string }) {
    this.countryName = item.text;
    this.flagvalue = item.flag;
    this.langStoreValue = item.lang;
    this.languageService.setLanguage(item.lang);
    this.localStorageService.set('lang', item.lang);
  }

  onAccountClicked() {
    this.router.navigate(['/extra-pages/profile']);
  }

  onInboxClicked() {
    this.router.navigate(['/email/inbox']);
  }

  onSettingsClicked() {
    this.router.navigate(['/extra-pages/faqs']);
  }
}
