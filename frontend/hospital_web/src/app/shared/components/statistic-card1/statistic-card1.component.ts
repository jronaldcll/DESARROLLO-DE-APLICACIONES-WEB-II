import { CommonModule } from '@angular/common';
import { Component, input, ChangeDetectionStrategy, signal, effect, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { animateCount } from '../../utils/count-animation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-statistic-card1',
  imports: [MatCardModule, CommonModule],
  templateUrl: './statistic-card1.component.html',
  styleUrl: './statistic-card1.component.scss'
})
export class StatisticCard1Component implements OnDestroy {
  readonly title = input<string>('');
  readonly value = input<string | number>('');
  readonly percentage = input<string | number>('');
  readonly increase = input<boolean>(true);
  readonly imageUrl = input<string>('');

  displayValue = signal<string | number>('');
  private cleanupFn?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (this.cleanupFn) {
        this.cleanupFn();
      }
      this.cleanupFn = animateCount(this.value(), 1500, this.platformId, (v) => {
        this.displayValue.set(v);
      });
    });
  }

  ngOnDestroy() {
    if (this.cleanupFn) {
      this.cleanupFn();
    }
  }
}
