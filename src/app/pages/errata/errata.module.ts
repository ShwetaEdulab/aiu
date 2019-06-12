import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {
  FormsModule
} from '@angular/forms';
import {
  NbButtonModule,
} from '@nebular/theme';
import { ErrataComponent } from './errata.component';

import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import {
  ChartModule
} from 'primeng/chart';



@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NbButtonModule,
    InputSwitchModule,
    ConfirmDialogModule,
    TabViewModule,
    ChartModule

  ],
  declarations: [
    ErrataComponent
  ],
})
export class ErrataModule { }
