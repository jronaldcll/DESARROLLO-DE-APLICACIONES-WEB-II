import { Direction, BidiModule } from '@angular/cdk/bidi';
import { Component, Renderer2, DOCUMENT, inject , ChangeDetectionStrategy} from '@angular/core';
import { DirectionService, InConfiguration } from '@core';
import { ConfigService } from '@config';
import { LocalStorageService } from '@shared/services/storage.service';

import { RouterOutlet } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: [],
    imports: [BidiModule, RouterOutlet]
})
export class AuthLayoutComponent extends UnsubscribeOnDestroyAdapter {
  private document = inject<Document>(DOCUMENT);
  private directoryService = inject(DirectionService);
  private configService = inject(ConfigService);
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

    // set theme on startup
    if (this.localStorageService.has('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(
        this.document.body,
        this.localStorageService.get('theme') as string
      );
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }
  }
}
