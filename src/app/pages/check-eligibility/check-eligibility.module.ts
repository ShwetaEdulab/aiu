import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckEligibilityComponent } from './check-eligibility.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NbInputModule , NbDatepickerModule , NbSelectModule , NbCardModule , NbSpinnerModule , NbButtonModule } from '@nebular/theme';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [ CheckEligibilityComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDatepickerModule,
    NbSelectModule, 
    NbCardModule, 
    NbSpinnerModule,
    NbButtonModule,
    MatSelectModule,
    MatAutocompleteModule, 
    MatInputModule,
    MatFormFieldModule
  ]
})
export class CheckEligibilityModule { }
