import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { AttestationPageComponent } from './attestation-page.component';
import { NbCardModule,
  NbButtonModule,
  NbSelectModule, 
  NbInputModule ,
  NbStepperModule,
  NbDatepickerModule,
  NbRadioModule,
  NbDialogModule,
  NbActionsModule,
  NbPopoverModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FileUploadModule} from 'primeng/fileupload';        //this is need
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { NbSpinnerModule } from '@nebular/theme';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {
  MatSelectModule
} from '@angular/material';
import { paymentOptionsDialog } from './dialog/paymentOptionsDialog';

@NgModule({
  declarations: [
    AttestationPageComponent,
    paymentOptionsDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbStepperModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    NbSpinnerModule,
    MatSelectModule,
    NbRadioModule ,
    NbPopoverModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbActionsModule
  ],
  entryComponents: [
    paymentOptionsDialog
  ]
})
export class AttestationPageModule { }
