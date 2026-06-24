import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  ChangeDetectionStrategy,
  DOCUMENT,
  inject,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { ConfigService } from '@config';
import { DirectionService, InConfiguration, RightSidebarService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgScrollbar } from 'ngx-scrollbar';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { LocalStorageService } from '@shared/services/storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  imports: [
    NgClass,
    FeatherIconsComponent,
    NgScrollbar,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
})
export class RightSidebarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);
  elementRef = inject(ElementRef);
  private rightSidebarService = inject(RightSidebarService);
  private configService = inject(ConfigService);
  private directionService = inject(DirectionService);
  private localStorageService = inject(LocalStorageService);

  selectedBgColor = 'white';
  maxHeight!: string;
  maxWidth!: string;
  showpanel = false;
  isOpenSidebar!: boolean;
  isDarkSidebar = false;
  isDarTheme = false;
  isGlassmorphism = false;
  selectedGlassBgColor = 'purple-blue';
  glassBgOptions = [
    { name: 'purple-blue', start: '#e0c3fc', end: '#8ec5fc' },
    { name: 'sunset', start: '#f7e4a8', end: '#f7c2b3' },
    { name: 'mint', start: '#c2ffd8', end: '#8faab8' },
    { name: 'candy', start: '#f8cacc', end: '#ba9ab1' },
    { name: 'ocean', start: '#c3e3ff', end: '#74b7ba' },
    { name: 'yellow', start: '#e4e7c3', end: '#b9b859' },
    { name: 'lush', start: '#85e5da', end: '#abb993' },
  ];
  public innerHeight?: number;
  headerHeight = 60;
  isRtl = false;
  isHorizontal = false;
  public config!: InConfiguration;

  ngOnInit() {
    this.config = this.configService.configData;
    this.subs.sink = this.rightSidebarService.sidebarState.subscribe(
      (isRunning) => {
        this.isOpenSidebar = isRunning;
      },
    );
    this.setRightSidebarWindowHeight();
  }

  ngAfterViewInit() {
    this.selectedBgColor =
      (this.localStorageService.get('choose_skin_active') as string) || 'white';

    if (this.localStorageService.get('menuOption')) {
      if (this.localStorageService.get('menuOption') === 'menu_dark') {
        this.isDarkSidebar = true;
      } else if (this.localStorageService.get('menuOption') === 'menu_light') {
        this.isDarkSidebar = false;
      }
    }

    if (this.localStorageService.get('theme')) {
      if (this.localStorageService.get('theme') === 'dark') {
        this.isDarTheme = true;
      } else if (this.localStorageService.get('theme') === 'light') {
        this.isDarTheme = false;
      }
    }

    if (this.localStorageService.get('isRtl')) {
      if (this.localStorageService.get('isRtl') === 'true') {
        this.isRtl = true;
      } else if (this.localStorageService.get('isRtl') === 'false') {
        this.isRtl = false;
      }
    }

    if (this.localStorageService.get('isHorizontal')) {
      this.isHorizontal = this.localStorageService.get('isHorizontal') === 'true';
    }

    // Restore glassmorphism layout style
    if (this.localStorageService.get('layout_style')) {
      this.isGlassmorphism =
        this.localStorageService.get('layout_style') === 'glassmorphism';
    } else {
      this.isGlassmorphism =
        this.config.layout.layout_style === 'glassmorphism';
    }

    if (this.isGlassmorphism) {
      this.renderer.addClass(this.document.body, 'layout-glassmorphism');

      // Restore glassmorphism background color
      const savedGlassColor = this.localStorageService.get(
        'glass_bg_color',
      ) as string;
      const colorToApply =
        savedGlassColor || this.config.layout.glassmorphism_bg_color;
      if (colorToApply) {
        const option = this.glassBgOptions.find((o) => o.name === colorToApply);
        if (option) {
          this.selectedGlassBgColor = option.name;
          this.applyGlassBgColor(option.start, option.end);
        }
      }
    } else {
      this.renderer.removeClass(this.document.body, 'layout-glassmorphism');
    }
  }

  selectTheme(e: string) {
    if (this.isGlassmorphism) {
      return;
    }
    this.renderer.removeClass(
      this.document.body,
      'theme-' + this.selectedBgColor,
    );
    this.selectedBgColor = e;
    this.renderer.addClass(this.document.body, 'theme-' + this.selectedBgColor);
    this.localStorageService.set(
      'choose_skin',
      'theme-' + this.selectedBgColor,
    );
    this.localStorageService.set('choose_skin_active', this.selectedBgColor);
  }
  lightSidebarBtnClick() {
    this.renderer.removeClass(this.document.body, 'menu_dark');
    this.renderer.removeClass(this.document.body, 'logo-black');
    this.renderer.addClass(this.document.body, 'menu_light');
    this.renderer.addClass(this.document.body, 'logo-white');
    const menuOption = 'menu_light';
    this.localStorageService.set('choose_logoheader', 'logo-white');
    this.localStorageService.set('menuOption', menuOption);
  }
  darkSidebarBtnClick() {
    this.renderer.removeClass(this.document.body, 'menu_light');
    this.renderer.removeClass(this.document.body, 'logo-white');
    this.renderer.addClass(this.document.body, 'menu_dark');
    if (!this.isGlassmorphism) {
      this.renderer.addClass(this.document.body, 'logo-black');
    } else {
      this.renderer.addClass(this.document.body, 'logo-white');
    }
    const menuOption = 'menu_dark';
    this.localStorageService.set('choose_logoheader', 'logo-black');
    this.localStorageService.set('menuOption', menuOption);
  }
  lightThemeBtnClick() {
    this.renderer.removeClass(this.document.body, 'dark');
    this.renderer.removeClass(this.document.body, 'submenu-closed');
    this.renderer.removeClass(this.document.body, 'menu_dark');
    this.renderer.removeClass(this.document.body, 'logo-black');
    if (this.localStorageService.get('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        this.localStorageService.get('choose_skin') as string,
      );
    } else {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color,
      );
    }

    this.renderer.addClass(this.document.body, 'light');
    this.renderer.addClass(this.document.body, 'submenu-closed');
    this.renderer.addClass(this.document.body, 'menu_light');
    this.renderer.addClass(this.document.body, 'logo-white');
    this.renderer.addClass(this.document.body, 'theme-white');
    const theme = 'light';
    const menuOption = 'menu_light';
    this.selectedBgColor = 'white';
    this.isDarTheme = false;
    this.isDarkSidebar = false;
    this.localStorageService.set('choose_logoheader', 'logo-white');
    this.localStorageService.set('choose_skin', 'theme-white');
    this.localStorageService.set('theme', theme);
    this.localStorageService.set('menuOption', menuOption);
  }
  darkThemeBtnClick() {
    this.renderer.removeClass(this.document.body, 'light');
    this.renderer.removeClass(this.document.body, 'submenu-closed');
    this.renderer.removeClass(this.document.body, 'menu_light');
    this.renderer.removeClass(this.document.body, 'logo-white');
    if (this.localStorageService.get('choose_skin')) {
      this.renderer.removeClass(
        this.document.body,
        this.localStorageService.get('choose_skin') as string,
      );
    } else {
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.config.layout.theme_color,
      );
    }
    this.renderer.addClass(this.document.body, 'dark');
    this.renderer.addClass(this.document.body, 'submenu-closed');
    this.renderer.addClass(this.document.body, 'menu_dark');
    if (!this.isGlassmorphism) {
      this.renderer.addClass(this.document.body, 'logo-black');
      this.renderer.addClass(this.document.body, 'theme-black');
    } else {
      this.renderer.addClass(this.document.body, 'logo-white');
      this.renderer.addClass(this.document.body, 'theme-white');
    }
    const theme = 'dark';
    const menuOption = 'menu_dark';
    this.selectedBgColor = 'black';
    this.isDarTheme = true;
    this.isDarkSidebar = true;
    this.localStorageService.set('choose_logoheader', 'logo-black');
    this.localStorageService.set('choose_skin', 'theme-black');
    this.localStorageService.set('theme', theme);
    this.localStorageService.set('menuOption', menuOption);
  }

  // Glassmorphism layout style toggle
  layoutStyleBtnClick(style: string) {
    if (style === 'glassmorphism') {
      this.isGlassmorphism = true;
      this.renderer.addClass(this.document.body, 'layout-glassmorphism');

      // Force black icons (logo-white) in glass mode
      this.renderer.removeClass(this.document.body, 'logo-black');
      this.renderer.addClass(this.document.body, 'logo-white');

      // Ensure theme-white to prevent white icons from other themes
      this.renderer.removeClass(
        this.document.body,
        'theme-' + this.selectedBgColor,
      );
      this.renderer.addClass(this.document.body, 'theme-white');

      // Apply the selected (or default) glass background color
      const option = this.glassBgOptions.find(
        (o) => o.name === this.selectedGlassBgColor,
      );
      if (option) {
        this.applyGlassBgColor(option.start, option.end);
      }
    } else {
      this.isGlassmorphism = false;
      this.renderer.removeClass(this.document.body, 'layout-glassmorphism');

      // Restore theme color
      this.renderer.removeClass(this.document.body, 'theme-white');
      this.renderer.addClass(
        this.document.body,
        'theme-' + this.selectedBgColor,
      );

      // Restore logo color based on current layout/sidebar settings
      if (this.isDarTheme || this.isDarkSidebar) {
        this.renderer.removeClass(this.document.body, 'logo-white');
        this.renderer.addClass(this.document.body, 'logo-black');
      } else {
        this.renderer.removeClass(this.document.body, 'logo-black');
        this.renderer.addClass(this.document.body, 'logo-white');
      }
    }
    this.localStorageService.set('layout_style', style);
  }

  // Select glassmorphism background gradient color
  selectGlassBgColor(color: { name: string; start: string; end: string }) {
    if (!this.isGlassmorphism || this.isDarTheme) {
      return;
    }
    this.selectedGlassBgColor = color.name;
    this.applyGlassBgColor(color.start, color.end);
    this.localStorageService.set('glass_bg_color', color.name);
  }

  private applyGlassBgColor(start: string, end: string) {
    this.document.documentElement.style.setProperty('--glass-bg-start', start);
    this.document.documentElement.style.setProperty('--glass-bg-end', end);
  }

  setRightSidebarWindowHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.maxHeight = height + '';
    this.maxWidth = '500px';
  }
  onClickedOutside(event: Event) {
    const button = event.target as HTMLButtonElement;
    if (button.id !== 'settingBtn') {
      if (this.isOpenSidebar === true) {
        this.toggleRightSidebar();
      }
    }
  }
  toggleRightSidebar(): void {
    this.rightSidebarService.setRightSidebar(
      (this.isOpenSidebar = !this.isOpenSidebar),
    );
  }
  switchDirection(event: MatSlideToggleChange) {
    const isrtl = String(event.checked);
    if (
      isrtl === 'false' &&
      document.getElementsByTagName('html')[0].hasAttribute('dir')
    ) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      this.renderer.removeClass(this.document.body, 'rtl');
      this.directionService.updateDirection('ltr');
    } else if (
      isrtl === 'true' &&
      !document.getElementsByTagName('html')[0].hasAttribute('dir')
    ) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      this.renderer.addClass(this.document.body, 'rtl');
      this.directionService.updateDirection('rtl');
    }
    this.localStorageService.set('isRtl', isrtl);
    this.isRtl = event.checked;
  }
  setRTLSettings() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body, 'rtl');
    this.isRtl = true;
    this.localStorageService.set('isRtl', 'true');
  }
  setLTRSettings() {
    document.getElementsByTagName('html')[0].removeAttribute('dir');
    this.renderer.removeClass(this.document.body, 'rtl');
    this.isRtl = false;
    this.localStorageService.set('isRtl', 'false');
  }
  switchLayout(event: MatSlideToggleChange) {
    const isHorizontal = String(event.checked);
    if (isHorizontal === 'true') {
      this.renderer.addClass(this.document.body, 'horizontal-layout');
    } else {
      this.renderer.removeClass(this.document.body, 'horizontal-layout');
    }
    this.localStorageService.set('isHorizontal', isHorizontal);
    this.configService.configData.layout.horizontal = event.checked;
    this.isHorizontal = event.checked;
  }
}
