import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from './enums/role.enum';
import { AuthGuard } from './service/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./auth/auth.module").then(
        (m) => m.AuthModule
      ),
      title: 'system login'
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin-view/admin-view.module").then(
        (m) => m.AdminViewModule
      ),
      canActivate: [AuthGuard], data: { roles: [RoleEnum.admin] } ,
      title: 'system'
  },
  {
    path: "user",
    loadChildren: () =>
      import("./pages/user-view/user-view.module").then(
        (m) => m.UserViewModule
      ),
      canActivate: [AuthGuard], data: { roles: [RoleEnum.user] } ,
      title: 'system'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
