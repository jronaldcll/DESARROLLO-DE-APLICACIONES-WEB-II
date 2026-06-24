import { NgClass } from '@angular/common';
import { Component, input, ChangeDetectionStrategy, signal, effect, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { animateCount } from '../../utils/count-animation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-info-box1',
  imports: [MatProgressBarModule, NgClass],
  templateUrl: './info-box1.component.html',
  styleUrl: './info-box1.component.scss'
})
export class InfoBox1Component implements OnDestroy {
  readonly cardClass = input<string>('');
  readonly iconClass = input<string>('');
  readonly title = input<string>('');
  readonly value = input<string | number>('');
  readonly progressValue = input<number>(0);
  readonly progressClass = input<string>('');
  readonly percentageChange = input<number>(0);

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
