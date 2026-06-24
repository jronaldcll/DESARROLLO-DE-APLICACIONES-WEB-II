import { Injectable } from '@angular/core';
import { InConfiguration } from '../core/models/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public configData!: InConfiguration;

  constructor() {
    this.setConfigData();
  }

  setConfigData() {
    this.configData = {
      layout: {
        rtl: false, // options: true & false
        variant: 'light', // options: light & dark
        theme_color: 'white', // options: white, black, purple, blue, cyan, green, orange
        logo_bg_color: 'white', // options: white, black, purple, blue, cyan, green, orange
        layout_style: 'solid', // options: solid & glassmorphism
        glassmorphism_bg_color: 'purple-blue', // options: purple-blue, sunset, mint, candy, ocean, yellow, lush
        horizontal: false, // options: true & false
        sidebar: {
          collapsed: false, // options: true & false
          backgroundColor: 'light', // options: light & dark
        },
      },
    };
  }
}