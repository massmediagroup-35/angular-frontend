import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirect]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginRedirect]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [EnsureAuthenticated],
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [EnsureAuthenticated]
      },
      {
        path: '*',
        redirectTo: '/dashboard',
      },
    ])
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    LoginRedirect
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
