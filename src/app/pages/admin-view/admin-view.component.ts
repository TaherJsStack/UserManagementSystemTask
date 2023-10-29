import { Direction } from '@angular/cdk/bidi';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoaderService } from 'src/app/service/app/loader.service';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {

  direction: Direction = "rtl";

  DrawerMode: MatDrawerMode = 'side'
  @ViewChild('drawer') drawer:ElementRef<HTMLElement> | any;

  
  eventUrlSplit: any = [];
  
  isMobile:    boolean = false;
  pageTitle:   string = '';
  // showFiller:  boolean = true;
  startLoader: boolean = false


  constructor(
    private router:          Router,
    private loaderService:   LoaderService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.routerEvents()
    this.eventUrlSplit = window.location.hash.split('/')
    this.pageTitle = window.location.hash.split('/')[2]
    this.checkPageSize()
    this.getLang()
  }
  
  
  ngAfterViewInit() {
    this.loaderService.loaderState.subscribe(res => {
      this.startLoader = res
    })
  }

  isAsideMenu(e: any) {
  }

  routerEvents(){
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            // Show loading indicator
        }
        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            this.eventUrlSplit = event.url.split('/')
            this.pageTitle = event.url.split('/')[2]
            if (this.isMobile) {
            }
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator
            // Present error to user
        }
    });
  }

  checkPageSize() {
    this.isMobile = window.innerWidth > 1000 ? false : true; 
    if (window.innerWidth < 1000 ) {
      this.DrawerMode = 'over'
    }
  }

  getLang() {
    this.languageService.language.subscribe(lang => {
      this.direction = lang === 'en'? 'ltr' : 'rtl'
    })
  }

}
