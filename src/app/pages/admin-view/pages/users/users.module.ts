import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersDataListComponent } from './users-data-list/users-data-list.component';

import { ProfileComponent } from './profile/profile.component';
import { MatModule } from 'src/app/shared/mat.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDataListComponent,
    UsersFormComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatModule,
    SharedModule,
  ]
})
export class UsersModule { }
