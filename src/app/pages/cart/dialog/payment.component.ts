import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'ngx-payment',
  template: `
  <nb-card [style.width.px]="700" [style.height.px]="400" status="success" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge">
  <nb-card-header>
    <div class="row">
      <div class="col-md-5">
      </div>
      <div class="col-md-4">
        <h3 style="color:#ffffff">PAYMENT</h3>
      </div>
      <div class="col-md-3">
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Name</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Name" ngModel="{{user_data?.name}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Telephone</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Telephone" ngModel="{{user_data?.mobile}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Email</div>
      <div class="col-md-9"> 
        <input type="text" nbInput fullWidth placeholder="Email" ngModel="{{user_data?.email}}" [readonly]="true">
      </div>
    </div>
    <div class="row" style="margin-bottom:7px">
      <div class="col-md-3">Amount</div>
      <div class="col-md-9"> 
      <input type="text" nbInput fullWidth placeholder="Total Amunt" ngModel="INR {{total_amount}}" [readonly]="true">
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <button nbButton hero status="primary" (click)="dismiss()">Close</button><button nbButton hero status="primary" (click)="firstpayment()">Proceed For Payment</button>
    </div>
    <div class="col-md-3"></div>
    </div>
  </nb-card-footer>
</nb-card>
<div>
<form id="nonseamless" method="post" name="redirect" action="{{secureUrl}}"> <input type="hidden" id="encRequest" name="encRequest" value="{{encRequest}}"><input type="hidden" name="access_code" id="access_code" value="{{accessCode}}"></form>
</div>
  `
})
export class PaymentComponent implements OnInit {
  @Input() total_amount: string;
  user_data;
  loading = false;
  accessCode: any;
  secureUrl: any;
  encRequest: any;
  constructor(protected ref: NbDialogRef<PaymentComponent>,
    protected api : ApiService) { }

  ngOnInit() {
    this.api.getUserData()
    .subscribe(data => {
        this.user_data = data['data'];
      },
      error => {
      console.error("Error", error);
      }
    )
  }

  dismiss(){
    this.ref.close();
  }

  async firstpayment(){
    this.loading = true;
    var payment = await this.api.paymentrequest(this.total_amount);
    payment.subscribe(
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
