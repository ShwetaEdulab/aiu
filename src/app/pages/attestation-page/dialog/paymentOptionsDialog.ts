import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
selector: 'nb-dialog',
template: `

<nb-card [style.width.px]="400" status="success">
  <nb-card-header style="text-align:center;font-size: 150%;">
    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-10">
        <h3 style="color:#ffffff">
          PAYMENT OPTION
        </h3>
      </div>
      <div class="col-md-1">
        <div>
          <nb-action icon="ion-close-round" (click)="dismiss()">
          </nb-action>
        </div>
      </div>
  </div>
  </nb-card-header>
  <nb-card-body>
    <div *ngIf="show_buttons == true">
      <div class="row">
        <div class="col-md-12">
          <h4>Obtain AIU Equivalence certificate</h4>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-9">
          <button nbButton type='button' size="medium" (click)="proceedForPayment('22058')" hero status="info">Within 7 days(INR 22,058)</button>
        </div>
        <div class="col-md-1">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-5">
        </div>
        <div class="col-md-6">
          <h4>OR</h4>
        </div>
        <div class="col-md-1">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-9">
          <button nbButton type='button' size="medium" (click)="proceedForPayment('16010')" hero status="info">Within 31 days(INR 16,010)</button>
        </div>
        <div class="col-md-1">
        </div>
      </div>
    </div>
    <div *ngIf="show_buttons == false">
      <div class="col-md-1">
      </div>
      <div class="col-md-11">
        <h4>YOU HAVE ALREADY MADE PAYMENT !!!</h4>
      </div>
    </div>
  </nb-card-body>
</nb-card> 
<div>
<form id="nonseamless" method="post" name="redirect" action="{{secureUrl}}"> <input type="hidden" id="encRequest" name="encRequest" value="{{encRequest}}"><input type="hidden" name="access_code" id="access_code" value="{{accessCode}}"></form>
</div>
`,
})
export class paymentOptionsDialog {
  accessCode: any;
  secureUrl: any;
  encRequest: any;
  show_buttons : boolean = false ;

  constructor(protected ref: NbDialogRef<paymentOptionsDialog>,
    protected api : ApiService
  ) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
      this.api.checkPayment().subscribe(
        data =>{
          if(data['status'] == 200){
            this.show_buttons = false;
          }else if(data['status'] == 400){
            this.show_buttons = true;
          }
        }
      )
  }

  async proceedForPayment(amount){
     // this.loading = true;
    var paymentRequest = await this.api.paymentRequest(amount);
    paymentRequest.subscribe(
        data => {
          this.accessCode = data['data']['accessCode'];
          this.secureUrl = data['data']['secureUrl'];
          this.encRequest = data['data']['encRequest'];
          setTimeout(function(){ 
      
            this.loading = false;
            var myForm = <HTMLFormElement>document.getElementById('nonseamless');
            
            myForm.submit();
          }, 1000);
        },
        error => {
            console.log("Error", error);
        }
    ); 
  }
  
}