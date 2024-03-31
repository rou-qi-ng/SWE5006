import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationComponent } from './home-pages/user-registration/user-registration.component';
// import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './helpers/token.inceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './home-pages/login-page/login-page.component';
import { RegisterPageComponent } from './home-pages/register-page/register-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { BaseHomeComponent } from './home-pages/base-home/base-home.component';
import { DashboardPageComponent } from './customer-pages/dashboard-page/dashboard-page.component';
import { SearchPageComponent } from './customer-pages/search-page/search-page.component';
// import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BusinessPagesComponent } from './business-pages/business-pages.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServiceProfilePageComponent } from './customer-pages/serviceProfile-page/serviceProfile-page.component';
// import { UserUpdateComponent } from './user-update/user-update.component';
// import { UserDetailsComponent } from './user-details/user-details.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRegistrationComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForbiddenPageComponent,
    BaseHomeComponent,
    DashboardPageComponent,
    SearchPageComponent,
    ServiceProfilePageComponent
    // UserUpdateComponent,
    // UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
