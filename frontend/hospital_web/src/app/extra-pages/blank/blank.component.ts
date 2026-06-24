import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss'],
    imports: [BreadcrumbComponent]
})
export class BlankComponent {
  constructor() {
    // constructor code
  }
}
