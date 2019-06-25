import { RouterModule, Routes ,CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { 
  AuthGuardService as AuthGuard 
} from '../shared/auth-guard.service';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SubAdminDashboardComponent } from './sub-admin-dashboard/sub-admin-dashboard.component';
import { RoleGuardService as RoleGuard  } from '../shared/role-guard.service';
import { AttestationPageComponent } from './attestation-page/attestation-page.component';
import { CartComponent } from './cart/cart.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { MyapplicationsComponent } from './myapplications/myapplications.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrataComponent } from './errata/errata.component';
import { SettingsComponent } from './settings/settings.component';
import { paymentDetailsComponent } from './paymentDetails/paymentDetails.component';
import { DownloadComponent } from './download/download.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { PaymentDetailsAdminComponent } from '../admin/payment-details/payment-details.component'
import { AdminViewComponent } from '../admin/view/view.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard/attestation_page',
    component: AttestationPageComponent,
  },
  {
    path: 'dashboard/payment_details',
    component: paymentDetailsComponent,
  }, 
  {
    path: 'profile',
    component: ProfileComponent,
  },  
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'PaymentSuccess',
    component: PaymentSuccessComponent,
  },
  {
    path: 'PaymentCancel',
    component: PaymentCancelComponent,
  },
  {
    path: 'PaymentFailure',
    component: PaymentFailureComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
    {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  }, {
    path: 'myapplications',
    component: MyapplicationsComponent,
  },{
    path: 'download',
    component: DownloadComponent,

  }, {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard], 
    // data: { 
    //   expectedRole: 'admin'
    // } 
  },
  {
    path: 'studentManagement',
    component: StudentManagementComponent,

  },
  {
    path: 'sub-admin-dashboard',
    component: SubAdminDashboardComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'adminErrata',
    component: ErrataComponent,

  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'paymentDetails',
    component: PaymentDetailsAdminComponent,

  },
  {
    path: 'adminView',
    component: AdminViewComponent,

  }, 
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
