import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from './payment-success.component';
import { NbCardModule , NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [PaymentSuccessComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class PaymentSuccessModule { }
