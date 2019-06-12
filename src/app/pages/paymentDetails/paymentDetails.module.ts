import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { paymentDetailsComponent } from './paymentDetails.component';
import { NbCardModule,NbButtonModule,NbSelectModule, NbInputModule , NbStepperModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [
    paymentDetailsComponent
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
    NbSpinnerModule
  ]
})
export class paymentDetailsModule { }
