import { Direction, BidiModule } from '@angular/cdk/bidi';
import { AfterViewInit, Component, Renderer2, DOCUMENT, inject , ChangeDetectionStrategy} from '@angular/core';
import { DirectionService, InConfiguration, RightSidebarService } from '@core';
import { ConfigService } from '@config';

import { RouterOutlet } from '@angular/router';
import { RightSidebarComponent } from '../../right-sidebar/right-sidebar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { AiChatAssistantComponent } from '../../components/ai-chat-assistant/ai-chat-assistant.component';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { LocalStorageService } from '@shared/services/storage.service';

import { HorizontalSidebarComponent } from '../../sidebar/horizontal-sidebar/horizontal-sidebar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: [],
    imports: [
        HeaderComponent,
        SidebarComponent,
        HorizontalSidebarComponent,
        RightSidebarComponent,
        AiChatAssistantComponent,
        BidiModule,
        RouterOutlet,
    ],
    providers: [RightSidebarService]
})
export class MainLayoutComponent extends UnsubscribeOnDestroyAdapter implements AfterViewInit {
  private directoryService = inject(DirectionService);
  private configService = inject(ConfigService);
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);
  private localStorageService = inject(LocalStorageService);

  direction!: Direction;
  public config!: InConfiguration;
  constructor() {
    super();
    this.config = this.configService.configData;
    this.subs.sink = this.directoryService.currentData.subscribe((currentData) => {
      if (currentData) {
        this.direction = currentData === 'ltr' ? 'ltr' : 'rtl';
      } else {
        if (this.localStorageService.has('isRtl')) {
          if (this.localStorageService.get('isRtl') === 'true') {
            this.direction = 'rtl';
          } else if (this.localStorageService.get('isRtl') === 'false') {
            this.direction = 'ltr';
          }
        } else {
          if (this.config) {
            if (this.config.layout.rtl === true) {
              this.direction = 'rtl';
              this.localStorageService.set('isRtl', 'true');
            } else {
              this.direction = 'ltr';
              this.localStorageService.set('isRtl', 'false');
            }
          }
        }
      }
    });
  }
  ngAfterViewInit(): void {
    //------------ set varient start----------------
    if (this.localStorageService.has('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(
        this.document.body,
        this.localStorageService.get('theme') as string
      );
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
      this.localStorageService.set('theme', this.config.layout.variant);
    }

    //------------ set varient end----------------

    //------------ set theme start----------------

    if (this.localStorageService.has('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color
      );

      this.renderer.addClass(
        this.document.body,
        this.localStorageService.get('choose_skin') as string
      );
      this.localStorageService.set(
        'choose_skin_active',
        (this.localStorageService.get('choose_skin') as string).substring(6)
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color
      );

      this.localStorageService.set(
        'choose_skin',
        'theme-' + this.config.layout.theme_color
      );
      this.localStorageService.set(
        'choose_skin_active',
        this.config.layout.theme_color
      );
    }

    //------------ set theme end----------------

    //------------ set RTL start----------------

    if (this.localStorageService.has('isRtl')) {
      if (this.localStorageService.get('isRtl') === 'true') {
        this.setRTLSettings();
      } else if (this.localStorageService.get('isRtl') === 'false') {
        this.setLTRSettings();
      }
    } else {
      if (this.config.layout.rtl == true) {
        this.setRTLSettings();
      } else {
        this.setLTRSettings();
      }
    }
    //------------ set RTL end----------------

    //------------ set sidebar color start----------------

    if (this.localStorageService.has('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        this.localStorageService.get('menuOption') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
      this.localStorageService.set(
        'menuOption',
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    //------------ set sidebar color end----------------

    //------------ set logo color start----------------

    if (this.localStorageService.has('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        this.localStorageService.get('choose_logoheader') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    //------------ set logo color end----------------

    //------------ set sidebar collapse start----------------
    if (this.localStorageService.has('collapsed_menu')) {
      if (this.localStorageService.get('collapsed_menu') === 'true') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed == true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
        this.localStorageService.set('collapsed_menu', 'true');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
        this.localStorageService.set('collapsed_menu', 'false');
      }
    }

    //------------ set sidebar collapse end----------------

    //------------ set horizontal layout start----------------
    if (this.localStorageService.has('isHorizontal')) {
      if (this.localStorageService.get('isHorizontal') === 'true') {
        this.renderer.addClass(this.document.body, 'horizontal-layout');
      } else {
        this.renderer.removeClass(this.document.body, 'horizontal-layout');
      }
    } else {
      if (this.config && this.config.layout.horizontal === true) {
        this.renderer.addClass(this.document.body, 'horizontal-layout');
      } else {
        this.renderer.removeClass(this.document.body, 'horizontal-layout');
      }
    }
    //------------ set horizontal layout end----------------
  }

  setRTLSettings() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body, 'rtl');

    this.localStorageService.set('isRtl', 'true');
  }
  setLTRSettings() {
    document.getElementsByTagName('html')[0].removeAttribute('dir');
    this.renderer.removeClass(this.document.body, 'rtl');

    this.localStorageService.set('isRtl', 'false');
  }
}
