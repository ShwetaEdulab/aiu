

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { NbSelectModule, NbDatepickerModule } from '@nebular/theme';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,

    NbDatepickerModule.forRoot(),
  ]
})
export class ProfileModule { }
