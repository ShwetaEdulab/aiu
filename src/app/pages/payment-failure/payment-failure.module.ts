import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFailureComponent } from './payment-failure.component';
import { NbCardModule , NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [PaymentFailureComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class PaymentFailureModule { }
