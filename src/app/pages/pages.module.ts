import {
  NgModule
} from '@angular/core';

import {
  PagesComponent
} from './pages.component';
import {
  DashboardModule
} from './dashboard/dashboard.module';
import {
  PagesRoutingModule
} from './pages-routing.module';
import {
  ThemeModule
} from '../@theme/theme.module';
import {
  MiscellaneousModule
} from './miscellaneous/miscellaneous.module';
import {
  AdminDashboardComponent,
  AdminSnackComponent
} from './admin-dashboard/admin-dashboard.component';
import {
  SubAdminDashboardComponent,
  SubAdminSnackComponent
} from './sub-admin-dashboard/sub-admin-dashboard.component';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import {
  TotalComponent
} from './admin-dashboard/total/total.component';
import {
  ShowTranscriptComponent
} from './admin-dashboard/total/dialog/show-transcript.component';
import {
  ShowPreviewComponent
} from './admin-dashboard/total/dialog/show-preview.component';
import {
  UploadCertificateComponent
} from './admin-dashboard/total/dialog/upload_certificate';
import {
  pendingComponent
} from './admin-dashboard/pending/pending.component';
import {
  SignedComponent
} from './admin-dashboard/signed/signed.component';
import {
  SignedNamrataComponent
} from './admin-dashboard/signed-namrata/signed-namrata.component';
import { 
  VerifiedComponent
} from './admin-dashboard/verified/verified.component';
import {
  AttestationPageModule
} from './attestation-page/attestation-page.module';
import {
  CartModule
} from './cart/cart.module';
import {
  PaymentSuccessModule
} from './payment-success/payment-success.module';
import {
  PaymentCancelModule
} from './payment-cancel/payment-cancel.module';
import {
  PaymentFailureModule
} from './payment-failure/payment-failure.module';
import {
  MyapplicationsModule
} from './myapplications/myapplications.module';
import {
  paymentDetailsModule
} from './paymentDetails/paymentDetails.module';
import {
  ProfileComponent
} from './profile/profile.component';
import {
  MatSelectModule
} from '@angular/material';
import { NbButtonModule } from '@nebular/theme';
import {
  ChartModule
} from 'primeng/chart';
import { MatDatepickerModule , MatNativeDateModule } from '@angular/material';
import { ErrataModule } from './errata/errata.module';
import { SettingsComponent } from './settings/settings.component';
import { DownloadModule } from './download/download.module';
import { NbSpinnerModule } from '@nebular/theme';
import {FileUploadModule} from 'primeng/fileupload'; 

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    AttestationPageModule,
    CartModule,
    PaymentSuccessModule,
    PaymentCancelModule,
    PaymentFailureModule,
    MyapplicationsModule,
    NbButtonModule,
    ChartModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    ErrataModule,
    paymentDetailsModule,
    DownloadModule,
    NbSpinnerModule,
    FileUploadModule,
  ],
  exports: [
    MatFormFieldModule
  ],
  entryComponents: [
    AdminSnackComponent,
    SubAdminSnackComponent,
    ShowTranscriptComponent,
    ShowPreviewComponent,
    UploadCertificateComponent,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingsComponent,
    AdminDashboardComponent,
    SubAdminDashboardComponent,
    SignedNamrataComponent,
    SignedComponent,
    TotalComponent,
    pendingComponent,
    VerifiedComponent,
    AdminSnackComponent,
    SubAdminSnackComponent,
    ProfileComponent,
    ShowTranscriptComponent,
    ShowPreviewComponent,
    UploadCertificateComponent,
    
  ],
})
export class PagesModule {}