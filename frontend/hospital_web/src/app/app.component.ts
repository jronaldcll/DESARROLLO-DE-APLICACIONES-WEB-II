
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    imports: [
        RouterModule,
        PageLoaderComponent
    ],
    providers: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  _router = inject(Router);

  currentUrl!: string;
  constructor() {
    this._router.events.pipe(takeUntilDestroyed()).subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0);
    });
  }
}
