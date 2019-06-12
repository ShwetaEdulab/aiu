import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
// import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import { NbContextMenuModule, NbListModule,
  NbDatepickerModule,
  NbSelectModule, 
  NbRadioModule ,
  NbDialogModule,
  NbInputModule} from '@nebular/theme';
import { NbAlertModule} from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart.component';
import { AppComponent } from '../../app.component';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaymentComponent } from './dialog/payment.component';



@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    FormsModule,
    NbStepperModule,
    NbContextMenuModule,
    NbListModule,
    NbSelectModule,
    NbButtonModule,
    NbRadioModule,
    NbDatepickerModule,
    NbAlertModule,
    NgbModalModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    Ng2SmartTableModule
    
  ],
  declarations: [
    CartComponent,
    Firstpaymentdialog,
    PaymentComponent,
 
    
  ],
  providers: [AppComponent

  ],
  entryComponents: [
    Firstpaymentdialog,
    PaymentComponent
  ]
  
})
export class CartModule {
}