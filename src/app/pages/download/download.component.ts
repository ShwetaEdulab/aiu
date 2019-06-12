import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'ngx-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  paymentData: any;

  constructor(protected api : ApiService,
    ) { }

  ngOnInit() {
     this.api.getAllPayments().subscribe(data  =>{
        this.paymentData = data['data'];
    });
  }

  DownloadReceipt(application_id){
    var value = application_id+"_Attestation_Payment_Challan.pdf"
    this.api.downloadReceipt(application_id).subscribe((data)=>{
      saveAs(data, value);
    })
  }

}
