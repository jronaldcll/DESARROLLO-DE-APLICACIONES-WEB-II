import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-second1',
    templateUrl: './second1.component.html',
    styleUrls: ['./second1.component.scss'],
    imports: [BreadcrumbComponent]
})
export class Second1Component {
  constructor() {
    // constructor code
  }
}
