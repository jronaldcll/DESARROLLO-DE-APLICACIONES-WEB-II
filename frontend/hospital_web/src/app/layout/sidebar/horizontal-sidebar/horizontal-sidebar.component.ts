import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { SidebarService } from '../sidebar.service';
import { RouteInfo } from '../sidebar.metadata';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgClass,
    TranslateModule,
    NgxPermissionsModule,
  ],
  templateUrl: './horizontal-sidebar.component.html',
  styleUrls: ['./horizontal-sidebar.component.scss'],
})
export class HorizontalSidebarComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy, AfterViewInit {
  private sidebarService = inject(SidebarService);
  private cdr = inject(ChangeDetectorRef);

  public sidebarItems!: RouteInfo[];

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef<HTMLDivElement>;

  showLeftArrow = false;
  showRightArrow = false;

  ngOnInit() {
    this.subs.sink = this.sidebarService
      .getRouteInfo()
      .subscribe((routes: RouteInfo[]) => {
        this.sidebarItems = routes.filter(item => !item.groupTitle);
        this.cdr.markForCheck();
        // Give time for layout to render then check arrows
        setTimeout(() => this.checkArrows(), 150);
      });
  }

  ngAfterViewInit() {
    this.checkArrows();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkArrows();
  }

  onScroll(_event: Event) {
    this.checkArrows();
  }

  checkArrows() {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    
    // Add minor tolerance (1px) to prevent rounding float issues
    const newLeft = el.scrollLeft > 1;
    const newRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    if (this.showLeftArrow !== newLeft || this.showRightArrow !== newRight) {
      this.showLeftArrow = newLeft;
      this.showRightArrow = newRight;
      this.cdr.markForCheck();
    }
  }

  scrollLeftDir() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
    }
  }

  scrollRightDir() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
    }
  }

  onMouseEnter(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const submenu = target.querySelector('.ml-menu') as HTMLElement;
    if (submenu) {
      const rect = target.getBoundingClientRect();
      submenu.style.left = `${rect.left}px`;
      if (document.body.classList.contains('layout-glassmorphism')) {
        submenu.style.top = '60px';
      } else {
        submenu.style.top = `${rect.bottom}px`;
      }
    }
  }
}
