import { Component, Input, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { NbDialogRef,NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { ErrataComponent } from './errata.component';

@Component({
    selector: 'nb-dialog',
    template: `
       <nb-card [style.width.px]="450"  [style.height.px]="300" status="success">
        <nb-card-header id="header">
        <div class="row">
                    <div class="col-md-8">
                    Please Enter the message for student:
                    </div>
                    <div class="col-md-4" style="text-align:right">
                    <nb-action icon="ion-close" (click)="close()"></nb-action>
                      </div>
                    </div>
        </nb-card-header>
           <nb-card-body>
           <textarea cols="30" rows="5" [(ngModel)]="message" name="message" class="form-control" placeholder="Enter message here."></textarea>
      </nb-card-body>
	  <nb-card-footer>
      <div class="row" >
      <div class="col-md-5"></div>
      <div class="col-md-7"><button nbButton hero status="primary" (click)="ok()">OK</button> 
	  </div>
	 </div>           
        </nb-card-footer>
    </nb-card>
    `,
    })
    export class StatementComponent  {
        @Input() userId:any;
        @Input() trans_id:any;
        @Input() status:any;
        @Input() trans_name:any;
        message : any;

            constructor(protected ref: NbDialogRef<StatementComponent>,
              private router : Router,
              private dialogService: NbDialogService,
              protected api : ApiService,
              private cdref : ChangeDetectorRef) {
            }

            ok(){
                console.log("message.value>>>>>>>>>"+this.message+"  "+this.userId+"  "+this.trans_id)
                var msg_from_admin_data ={
                    userId : this.userId,
                    message: this.message,
                    transId : this.trans_id,
                 }
                 //todo: code for condition false
                // if(this.status != true){
                 this.api.sendmessage(msg_from_admin_data) .subscribe(
                    (data: any) => {
                       if(data['status'] == 200){
                           
                       }else if(data['status'] == 400){                              
                           console.error("error 400 ");
                       }else{
                       }       
                           err => console.error(err)
                           this.ref.close();
             });
           // }
            this.ref.close();
            }

            
            close(){
                this.ref.close();
              }
        }