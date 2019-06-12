/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { RegisterComponent } from './auth/register/register.component';
import { changePasswordComponent } from './auth/changePassword/changePassword.component';
import { OtpComponent } from './auth/register/otp.component';
import { RegisteredComponent } from './auth/register/registered.component';
import { TermsComponent } from './auth/register/terms.component';
import { ForgotPasswordComponent } from './auth/Forgot-password/forgot-password.component';
import { resetPasswordComponent } from './auth/Reset-password/reset-password.component';
import { ResendEmailComponent } from './auth/Forgot-password/resend-email.component';
import { ConfirmPassComponent } from './auth/register/confirmPass.component';
import { config } from '../../config';
import { OTPModule } from './auth/otp/otp.module';
import { AuthGuardService } from './shared/auth-guard.service';
import { RoleGuardService } from './shared/role-guard.service';
import { ApiService } from './shared/api.service';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTInterceptor } from '@nebular/auth';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatExpansionModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AdminOtpComponent } from './pages/admin-dashboard/admin-otp/admin-otp.component';
import {StatementComponent} from './pages/errata/statement.component'



@NgModule({
  declarations: [AppComponent,
    RegisterComponent,
    changePasswordComponent,
    OtpComponent,
    RegisteredComponent,
    TermsComponent,
    ForgotPasswordComponent,
    resetPasswordComponent,
    ResendEmailComponent,
    ConfirmPassComponent,
    NavmenuComponent,
    HomeComponent,
    AdminOtpComponent,
    StatementComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OTPModule,
    MatSelectModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ConfirmDialogModule,
    DialogModule,
    LayoutModule,
   MatToolbarModule,
   MatButtonModule,
   MatSidenavModule,
   MatIconModule,
   MatListModule,
   MatCardModule,
   MatExpansionModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
    AuthGuardService,
    RoleGuardService,
    ApiService,
 
  ],entryComponents:[
    OtpComponent,
    RegisteredComponent,
    TermsComponent,
    ResendEmailComponent,
    ConfirmPassComponent,
    AdminOtpComponent,
    StatementComponent
  ]
})
export class AppModule {
}
export function filterInterceptorRequest(req: HttpRequest<any>) {
  return [config.serverUrl+'/api/auth/',
         ]
    .some(url => req.url.includes(url));
}