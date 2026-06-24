import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-first1',
    templateUrl: './first1.component.html',
    styleUrls: ['./first1.component.scss'],
    imports: [BreadcrumbComponent]
})
export class First1Component {
  constructor() {
    // constructor code
  }
}
