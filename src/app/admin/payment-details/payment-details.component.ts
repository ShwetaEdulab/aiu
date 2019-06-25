import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsAdminComponent implements OnInit {
  Total_data : any;
  tab_type: string;
	public filterText: string;
	public filterPlaceholder: string;
	public filterInput = new FormControl();
	p: number = 1;
  loadingbutton = false;
  
  constructor(
    protected api : ApiService,
    private router : Router,
    private authService : NbAuthService
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
   }

  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.loadingbutton = true;
    this.api.getPaymentDetails('16010.00').subscribe(data=>{
      this.loadingbutton = false;
      this.Total_data = data['data'];
    });
    this.filterInput
    .valueChanges
    .debounceTime(200)
    .subscribe(term => {
      this.filterText = term;
    });
  }

  tab(e) {
    var index = e.index;
    if(index == 0){
    this.loadingbutton = true;
    this.api.getPaymentDetails('16010.00').subscribe(data=>{
      this.loadingbutton = false;
      this.Total_data = data['data'];
    });
    }else if(index == 1){
      this.loadingbutton = true;
      this.api.getPaymentDetails('22085.00').subscribe(data=>{
        this.loadingbutton = false;
        this.Total_data = data['data'];
      });
    }
    // else if(index == 2){
    //   this.loadingbutton = true;
    //   this.api.getPaymentDetails('3').subscribe(data=>{
    //     this.loadingbutton = false;
    //     this.Total_data = data['data'];
    //   });
    // }
  } 

}
