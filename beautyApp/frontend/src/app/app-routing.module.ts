import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './home-pages/user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';
//import { UserUpdateComponent } from './user-update/user-update.component';
import { RegisterPageComponent } from './home-pages/register-page/register-page.component';
import { LoginPageComponent } from './home-pages/login-page/login-page.component';
import { authGuard } from './helpers/auth.guard';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { BaseHomeComponent } from './home-pages/base-home/base-home.component';
import { DashboardPageComponent } from './customer-pages/dashboard-page/dashboard-page.component';
import { SearchPageComponent } from './customer-pages/search-page/search-page.component';



const routes: Routes = [
  { path: 'forbidden', component: ForbiddenPageComponent },
  // { path: '', redirectTo: 'users', pathMatch: 'full' },
  // { path: 'create-user', component: UserRegistrationComponent },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'home',
    component: BaseHomeComponent,
  },
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'service/:service',
    component: SearchPageComponent,
    canActivate: [authGuard],
  }
  // { path: 'update-user/:id', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

