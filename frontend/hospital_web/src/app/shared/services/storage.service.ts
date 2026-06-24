import { Injectable, inject } from '@angular/core';
import { ConfigService } from '@config';
import { InConfiguration } from '@core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private configService = inject(ConfigService);

  public config!: InConfiguration;

  constructor() {
    this.config = this.configService.configData;
  }

  private getStoragePrefix(): string {
    const templateType =
      this.config.layout.variant === 'dark' ? 'dark' : 'light';
    const directionPrefix = this.config.layout.rtl ? 'rtl_' : 'ltr_';
    return `${templateType}_${directionPrefix}`;
  }

  get<T = unknown>(key: string): T | null {
    const prefix = this.getStoragePrefix();
    const item = localStorage.getItem(prefix + key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item as unknown as T;
      }
    }
    return null;
  }

  set<T = unknown>(key: string, value: T): boolean {
    const prefix = this.getStoragePrefix();
    localStorage.setItem(prefix + key, JSON.stringify(value));

    return true;
  }

  has(key: string): boolean {
    const prefix = this.getStoragePrefix();
    return !!localStorage.getItem(prefix + key);
  }

  remove(key: string) {
    const prefix = this.getStoragePrefix();
    localStorage.removeItem(prefix + key);
  }

  clear() {
    localStorage.clear();
  }
}

export class MemoryStorageService {
  private store: Record<string, string> = {};

  get<T = unknown>(key: string): T | null {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set<T = unknown>(key: string, value: T): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
