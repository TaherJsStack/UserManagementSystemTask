import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './service/app/loader.service';
import { LanguageService } from './service/language.service';

// import { SocketioService } from './service/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Angular Task App ';
  loaderSatrt: boolean = false;

  constructor(
    private translate:     TranslateService,
    private loaderService: LoaderService,
    // private socketService: SocketioService
    @Inject(DOCUMENT) private document: Document,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {  
    this.language()
    this.getLoaderState()
  }
  
  getLoaderState() {
    this.loaderService.loaderState.subscribe(state => {
      this.loaderSatrt = state;
    })
  }

  language() {

    if ('language' in localStorage) {
      let userLang = localStorage.getItem('language') || ''

      this.translate.use(userLang);
      this.document.documentElement.dir  = userLang == 'en' ? 'ltr' : 'rtl'; 
      this.document.documentElement.lang = userLang == 'en' ? 'en'  : 'ar'; 
      this.document.body.dir             = userLang == 'en' ? 'ltr' : 'rtl'; 

      this.languageService.setLanguage(userLang)
    } else {
      let selectedLang = this.translate.getBrowserCultureLang() || ''
      let l = selectedLang.split('-')[0].toString()
      this.translate.use(l);
      localStorage.setItem('language', l)
      this.document.documentElement.dir  = l === 'en' ? 'ltr' : 'rtl'; 
      this.document.documentElement.lang = l === 'en' ? 'en'  : 'ar'; 
      this.document.body.dir             = l === 'en' ? 'ltr' : 'rtl'; 
      this.languageService.setLanguage(selectedLang)
    }
  }


}
