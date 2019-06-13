import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ApiService } from '../../../../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {config} from '../../../../../../config';
import {MessageService} from 'primeng/api';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'nb-dialog',
  template: `
  <nb-card [style.width.px]="600"  [style.height.px]="700" status="success">
    <nb-card-header>
    <div class="row">
      <div class="col-md-11" style="text-align:center;">
        <h2><b>Upload AIU Certificate</b></h2>
      </div>
      <div class="col-md-1">
        <nb-action icon="ion-close-round" (click)="dismiss()"></nb-action>
      </div>
    </div>
    </nb-card-header>
    <nb-card-body>
      <div class="row" [nbSpinner]="loading" nbSpinnerStatus="primary">
        <div class="col-xl-3">
          <p-fileUpload ngDefaultControl [accept]="'.pdf,.jpg,.jpeg,.png,.PNG,.JPEG,.JPG,.PDF'"
            mode="basic" 
            name="file" 
            url="{{serverUrl}}/api/attestation/upload_certificate?user_id={{user_id}}&uploadtype=true&app_id={{application_id}}"
            chooseLabel="Upload Marksheet"
            accept="image/*" 
            ngDefaultControl [accept]="'.jpg,.jpeg,.png,.PNG,.JPEG,.JPG'" 
            maxFileSize="5000000"
            auto="true"
            (onSelect)="onSelect('Ph.D');"
            (onUpload)="onUpload($event)"
            (onError)="onErrorFileUpload($event)">
          </p-fileUpload>
        </div>
      </div>
    </nb-card-body>
    <nb-card-footer>
    <div style="text-align:center;font-size: 150%;">
      <button  nbButton hero status="primary" (click)="dismiss()">Close</button>
      </div>
      
    </nb-card-footer>
  </nb-card> 
  `,
  providers: [MessageService]
 // styleUrls: ['./show-transcript.component.scss']
})
export class UploadCertificateComponent implements OnInit {
  @Input() user_id ;
  @Input() email ;
  @Input() application_id ;
  loading = false;
  index: number;
  currenttoken: NbAuthJWTToken;
  serverUrl = config.serverUrl;
  //transUrl = config.certificateUploadUrl+"?user_id=" + this.user_id + "&uploadtype=true";
  constructor(protected ref: NbDialogRef<UploadCertificateComponent>,
    protected api : ApiService,
    private router : Router,
    private dialogService: NbDialogService,
    private messageService: MessageService,
    private authService: NbAuthService,
  ) { }

  ngOnInit() {
    console.log("this.user_idthis.user_idthis.user_id========>"+this.user_id);
    // this.api.getTranscriptDetails(this.user_id).subscribe( data => {
    //   if(data['status'] == 200){

    //     //this.ssc = data['data']['ssc'][0];
       
    //   }else if(data['status'] == 400){
    //     this.ref.close();
    //     alert('There is an issue in application.No Trascript found!!!');
    //   }
    // });
  }

  download(filename){
    filename = filename.split('/').pop();
    this.api.downloadFilesAdmin(filename,this.user_id)
    .subscribe(data => {
      saveAs(data, filename);
    });
  }

  dismiss(){
    this.ref.close();
  }

  onSelect(value): void {
    this.loading = true;
  }

  onUpload(event: any) {
    const reader = new FileReader();
    var duration = 10000;
    this.index += 1;
    if (event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      var json = JSON.parse(event.xhr.response);
      var yourData = json.data; 
      var yourStatus = json.status; 
      var yourMessage = json.message;
      if (yourStatus == 200) {
        this.loading = false;
        this.ref.close();
        this.messageService.add({severity:'success', summary: 'Success Message', detail : yourMessage});
      } else if (yourStatus == 401) {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: yourMessage});
      } else if (yourStatus == 400) {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: yourMessage});
      }
    }
  }

  onErrorFileUpload(event: any) {
    let msg: string = " ";
    msg += "Error: File NOT Uploaded. (" + event.files[0].name + ").  ";
    var duration = 10000;
    if (event.xhr.response == "") {
      this.messageService.add({severity:'error', summary: 'Error Message', detail: 'Network Error. Please try again after some time.'});
    }
  }

  onBeforeSend(event) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` + this.currenttoken);
      }
    });
  }

}
