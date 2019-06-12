import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';


@Component({
  selector: 'nb-dialog',
  template: ` 
  <nb-card [style.width.px]="800" [style.height.px]="800" status="success">
    <nb-card-header style="text-align:center;font-size: 150%;">
      <div class="row">
        <div class="col-md-11" style="text-align:center;font-size: 150%;">
          <h2>{{type}} Document</h2>
        </div>
        <div class="col-md-1">
          <nb-action icon="ion-close-round" (click)="dismiss()"></nb-action>
        </div>
      </div>
    </nb-card-header>
    <nb-card-body>
      <img class="img-responsive" style= "width: 600 px; height:600px;" [src]="file_name"/>
    </nb-card-body>
  </nb-card>`
})
export class ShowPreviewComponent implements OnInit {

  @Input() file_name ;
  @Input() type ;

  constructor(protected refPreview: NbDialogRef<ShowPreviewComponent>,
    protected api : ApiService) { }

  ngOnInit() {
    
  }

  dismiss(){
    this.refPreview.close();
  }


}
