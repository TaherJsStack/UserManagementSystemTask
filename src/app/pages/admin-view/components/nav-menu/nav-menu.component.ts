import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { UsersService } from 'src/app/service/user/users.service';
// import { SocketioService } from 'src/app/service/socketio.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Output() asideMenu = new EventEmitter<boolean>();
  user: UserModel     = {} as UserModel;
 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router:        Router,
    private toastr:        ToastrService,
    private usersService:  UsersService,
    private translate:     TranslateService,
    private languageService: LanguageService
    // private SocketioService: SocketioService
  ) {}

  async ngOnInit(){

    // this.SocketioService.socket.on('EVENT', (data: any) => {
    //   this.toastr.success('New Added')
    // });

    // this.SocketioService.socket.on('EVENT2', (data: any) => {
    //   this.toastr.success('New Added')
    // });


    this.asideMenu.emit()
    await this.getUserData()
    // used when user logout
    this.usersService.isLogin.subscribe(res => {
      if (!res) {
        this.router.navigateByUrl('/');
      }
    })
  }

  getUserData(){
    if ('fullInfo' in localStorage) {
      this.user = JSON.parse(localStorage.getItem("fullInfo") as string)
    } else {
      this.onLogOut()
    }
  }

  onLogOut(){
    this.usersService.logout()
  }
  

  setUserLang(val: string) {
    this.translate.use(val); 
    this.document.body.dir              = val == 'en' ? 'ltr'  : 'rtl';
    this.document.documentElement.dir   = val == 'en' ? 'ltr'  : 'rtl'; 
    this.document.documentElement.lang  = val == 'en' ? 'en'   : 'ar'; 
    localStorage.setItem('language', val)
    this.languageService.setLanguage(val)
  }
}
