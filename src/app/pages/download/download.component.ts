import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
  selector: 'ngx-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  providers:[HeaderComponent],
})
export class DownloadComponent implements OnInit {
  paymentData: any;
  CertificateDetails: any;

  constructor(
    protected api : ApiService,
    private comp: HeaderComponent,
    ) { }

  ngOnInit() {
     this.api.getAllPayments().subscribe(data  =>{
        this.paymentData = data['data'];
    });

    this.api.getCertificateDetails().subscribe(data  =>{
      this.CertificateDetails = data['data'];
  });
  }

  DownloadReceipt(application_id){
    var value = application_id+"_AIU_Payment_Challan.pdf"
    this.api.downloadReceipt(application_id).subscribe((data)=>{
      saveAs(data, value);
    })
  }

  DownloadTranscript(file_path){
    this.api.downloadFiles(file_path)
    .subscribe(data => {
      saveAs(data, file_path);    
    });
  }

}
