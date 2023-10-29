import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from './user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserViewComponent,
    title: 'User View',
    children: [
      {
        path: '',
        title: 'User',
        loadChildren: () => import("./user/user.module").then( (m) => m.UserModule ),
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewRoutingModule { }
