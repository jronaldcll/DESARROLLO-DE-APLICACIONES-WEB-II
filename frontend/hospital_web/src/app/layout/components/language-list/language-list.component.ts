import { CommonModule } from '@angular/common';
import { Component, input, output , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

export interface LanguageItem {
  text: string;
  flag: string;
  lang: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
  imports: [MatMenuModule, CommonModule, MatButtonModule],
})
export class LanguageListComponent {
  readonly flagvalue = input<string | string[]>();
  readonly defaultFlag = input<string>();
  readonly listLang = input<LanguageItem[]>([]);
  readonly langStoreValue = input<string>();

  readonly languageSelected = output<LanguageItem>();

  setLanguage(item: LanguageItem) {
    this.languageSelected.emit(item);
  }
}
