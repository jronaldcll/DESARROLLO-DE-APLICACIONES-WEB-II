import { Component , ChangeDetectionStrategy} from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-first3',
    templateUrl: './first3.component.html',
    styleUrls: ['./first3.component.scss'],
    imports: [BreadcrumbComponent]
})
export class First3Component {
  constructor() {
    // constructor code
  }
}
