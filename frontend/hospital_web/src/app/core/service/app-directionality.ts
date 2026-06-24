import { Directionality, Direction } from '@angular/cdk/bidi';
import { EventEmitter, Injectable, OnDestroy, inject, signal } from '@angular/core';
import { DirectionService } from './direction.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '@shared/services/storage.service';

@Injectable()
export class AppDirectionality implements Directionality, OnDestroy {
  readonly change = new EventEmitter<Direction>();
  readonly valueSignal = signal<Direction>('ltr');
  private directionService = inject(DirectionService);
  private localStorageService = inject(LocalStorageService);
  private sub: Subscription;

  constructor() {
    // Initialize valueSignal with correct initial value
    this.valueSignal.set(this.value);

    this.sub = this.directionService.currentData.subscribe((dir) => {
      if (dir) {
        const direction = dir as Direction;
        this.change.emit(direction);
        this.valueSignal.set(direction);
      }
    });
  }

  get value(): Direction {
    // Check local storage first for initial load sync
    const storedRtl = this.localStorageService.get('isRtl');
    if (storedRtl === 'true') {
      return 'rtl';
    } else if (storedRtl === 'false') {
      return 'ltr';
    }
    // Fallback or default
    return 'ltr';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
