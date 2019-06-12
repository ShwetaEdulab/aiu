import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from './download.component';
import { NbCardModule, NbPopoverModule } from '@nebular/theme';

@NgModule({
  declarations: [
    DownloadComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbPopoverModule,
  ]
})
export class DownloadModule { }
