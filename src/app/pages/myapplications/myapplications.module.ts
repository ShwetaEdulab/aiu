import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyapplicationsComponent } from './myapplications.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
//import { NbCardModule, NbButtonModule} from '@nebular/theme';

@NgModule({
  declarations: [MyapplicationsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ]
})
export class MyapplicationsModule { }
