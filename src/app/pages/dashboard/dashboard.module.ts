import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {
  NbStepperModule
} from '@nebular/theme/components/stepper/stepper.module';
import {
  FormsModule
} from '@angular/forms';
import {
  NbButtonModule,
} from '@nebular/theme';
import {
  MatStepperModule,MatFormFieldModule ,MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    ThemeModule,
    NbStepperModule,
    FormsModule,
    NbButtonModule,
    MatStepperModule,
    MatFormFieldModule,  
    MatSelectModule,
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule { }
