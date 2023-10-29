import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminViewRoutingModule } from './admin-view-routing.module';
import { MatModule } from 'src/app/shared/mat.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminViewComponent } from './admin-view.component';

@NgModule({
  declarations: [
    AdminViewComponent,
    SideMenuComponent,
    NavMenuComponent,
    DashboardComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminViewRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class AdminViewModule { }
