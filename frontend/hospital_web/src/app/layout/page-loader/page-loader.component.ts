import { Component , ChangeDetectionStrategy} from '@angular/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-page-loader',
    templateUrl: './page-loader.component.html',
    styleUrls: ['./page-loader.component.scss'],
    imports: [LoadingBarModule]
})
export class PageLoaderComponent {
  constructor() {
    // constructor code
  }
}
