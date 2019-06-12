import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCancelComponent } from './payment-cancel.component';
import { NbCardModule , NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [PaymentCancelComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class PaymentCancelModule { }
