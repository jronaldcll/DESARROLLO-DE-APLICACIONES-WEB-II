
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-statistic-card2',
    imports: [MatCardModule, MatIconModule],
    templateUrl: './statistic-card2.component.html',
    styleUrl: './statistic-card2.component.scss'
})
export class StatisticCard2Component {
  readonly title = input<string>('');
  readonly value = input<number | string>(0);
  readonly description = input<string>('');
  readonly img = input<string>('');
  readonly arrowIcon = input<string>('');
}
