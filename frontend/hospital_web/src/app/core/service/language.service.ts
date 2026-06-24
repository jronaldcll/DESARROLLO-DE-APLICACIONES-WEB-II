import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '@shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  translate = inject(TranslateService);
  private localStorageService = inject(LocalStorageService);

  public languages: string[] = ['en', 'es', 'de'];

  constructor() {
    const translate = this.translate;

    let browserLang: string;
    translate.addLangs(this.languages);

    if (this.localStorageService.has('lang')) {
      browserLang = this.localStorageService.get('lang') as string;
    } else {
      browserLang = translate.getBrowserLang() as string;
    }
    translate.use(browserLang.match(/en|es|de/) ? browserLang : 'en');
  }

  public setLanguage(lang: string) {
    this.translate.use(lang);
    this.localStorageService.set('lang', lang);
  }
}
