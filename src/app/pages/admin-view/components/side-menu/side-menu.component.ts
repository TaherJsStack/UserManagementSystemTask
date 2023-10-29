import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoleEnum } from 'src/app/enums/role.enum';
import { UserModel } from 'src/app/models/user';
import { SocketioService } from 'src/app/service/socketio.service';
import { UsersService } from 'src/app/service/user/users.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() asideMenu = new EventEmitter<boolean>();
  user:     UserModel = {} as UserModel;

  roleEnum        = RoleEnum
  panelOpenState  = false;

  sideList: {title: string, icon: string, count?: number, items: {itemTitle: string, icon: string, path: string, count?: number}[]}[] = [
    
    {title: this.translateService.instant('SideMenu.Users'), icon:"fa fa-users", items: [
        {itemTitle: this.translateService.instant('SideMenu.List'),    icon:"fa fa-database",   path: '/admin/users'},
        {itemTitle: this.translateService.instant('SideMenu.AddNew'), icon:"fa fa-plus-square", path: '/admin/users/usersForm'},
      ]
    },

  ]

  constructor(
    private usersService: UsersService,
    private router: Router,
    private translateService: TranslateService,
    // private SocketioService: SocketioService
  ) { }

  async ngOnInit() {

    this.getUserData()
    // used when use logout
    this.usersService.isLogin.subscribe(res => {
      if (!res) {
        this.router.navigateByUrl('/pageslogin');
      }
    })
    
    // this.SocketioService.socket.on('newOrder', (data: any) => {
    // });

    // this.SocketioService.socket.on('newComment', (data: any) => {
    // });
    
    // this.checkPageSize()

  }

  getUserData(){
    if ('fullInfo' in localStorage) {
      this.user = JSON.parse(localStorage.getItem("fullInfo") as string)
    } else {
      this.router.navigateByUrl('/pageslogin');
    }
  }

  onLogOut(){
    this.usersService.logout()
  }

  toggelSideMenuOnMobile(){
    if (window.innerWidth < 1000 ) {
      this.asideMenu.emit(true)
    }
  }

}
