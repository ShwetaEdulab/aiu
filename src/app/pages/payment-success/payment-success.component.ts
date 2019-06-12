import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-payment-success',
  template: `
  <div class="row">
  <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
    <nb-card status="success">
      <nb-card-header>
        <h1>PAYMENT SUCCESSFUL</h1>
      </nb-card-header>
      <nb-card-body>
        <div class="row">
          <h2>
            Thank you! Your transaction is successful
          </h2>
        </div>
        <div class="row">
          <h2>
            Your transaction id is {{ transaction_id }}
          </h2>  
        </div>
        <div class="row">
          <h3>
            <a href="" ng-click="redirect()">Click here</a>
            To proceed further
          </h3>
        </div>
        <div class="row">
          <h3> 
            Payment Details :-
          </h3>
        </div>
        <div class="row">
          <h4>
            Application Id: {{ application_id }}
          </h4>
        </div>
        <div class="row">
          <h4>
            Transaction ID: {{ transaction_id }}
          </h4> 
        </div>
        <div class="row">
          <h4>
            Amount        : {{ payment_amount }}
          </h4>
        </div>
        <div class="row">
          <h4>
            Payment Status: {{ payment_status }}
          </h4>
        </div>
        <div class="row">
          <button nbButton status="primary" (click)="pdfChallan()">Download Online Payment Receipt</button>
        </div>
      </nb-card-body>
    </nb-card>
  </div>
</div>
  `
})
export class PaymentSuccessComponent implements OnInit {
  transaction_id: any;
  application_id: any;
  payment_amount: any;
  payment_status: any;
  payment_date_time: any;
  user_id: any;

  constructor(protected api : ApiService,
    private router: Router,
    private route: ActivatedRoute,) { }

  async ngOnInit() {
    var PaymentDetails = await this.api.PaymentDetails(this.route.snapshot.queryParamMap.get('order_id'))
    PaymentDetails.subscribe(
      data => {
        this.transaction_id = data['data']['transaction_id'];
        this.application_id = data['data']['application_id'];
        this.payment_amount = data['data']['payment_amount'];
        this.payment_status = data['data']['payment_status'];
        this.payment_date_time = data['data']['payment_date_time'];
        this.user_id = data['data']['user_id'];
      }
    )
  }

  redirect(){
    console.log('in redirect');
  }

  async pdfChallan(){
    var generatereceipt = await this.api.OnlinePaymentChallan(this.transaction_id,this.payment_amount,this.payment_status,this.application_id,this.payment_date_time,this.user_id);
    generatereceipt.subscribe(
      data => {
        var value = data['data'].split('/').pop();
        this.api.downloadFiles(value)
          .subscribe(data => {
            saveAs(data, value);
          });
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }

}
