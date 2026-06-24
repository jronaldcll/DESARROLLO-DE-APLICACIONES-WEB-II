import { Injectable, inject, EventEmitter } from '@angular/core';
import { Directionality, Direction } from '@angular/cdk/bidi';
import { LocalStorageService } from '@shared/services';

@Injectable()
export class CustomDirectionality extends Directionality {
  private localStorageService = inject(LocalStorageService);
  override readonly change = new EventEmitter<Direction>();

  override get value(): Direction {
    return this.localStorageService.get('isRtl') === 'true' ? 'rtl' : 'ltr';
  }
}
