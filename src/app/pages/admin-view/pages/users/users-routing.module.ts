import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PermeationGuard } from 'src/app/service/guards/permeation.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersDataListComponent } from './users-data-list/users-data-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersDataListComponent
      },
      {
        path: 'UsersDataList',
        component: UsersDataListComponent
      },
      {
        path: 'usersForm',
        component: UsersFormComponent,
        // canActivate: [PermeationGuard], data: { permeation: [] },
      },
      {
        path: 'updateUser/:userId',
        component: UsersFormComponent,
        // canActivate: [PermeationGuard], data: { permeation: [] },
      },
      {
        path: 'userProfile/:userId',
        component: ProfileComponent
      },
    ]
  },

  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
