import { Component, OnInit,Input,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import {Location} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import { NbDialogService } from '@nebular/theme';
import { StatementComponent } from './statement.component';

@Component({
  selector: 'ngx-errata',
  templateUrl: './errata.component.html',
  styleUrls: ['./errata.component.scss'],
  providers:[ConfirmationService],
})
export class ErrataComponent implements OnInit {
  category: string;
  TranscriptData:any =[];
  errataTranscript: any=[];
  email: any;
  user: string;
  user_id: any;

  constructor(private route: ActivatedRoute,
    private _location: Location,
    private confirmationService: ConfirmationService,
    protected api : ApiService,
    private dialogservice : NbDialogService,
    private cdref : ChangeDetectorRef
  ) { }

  async ngOnInit() {
   var userId=this.route.snapshot.queryParamMap.get('userId');

    if (userId) {
        try {
            var userId=this.route.snapshot.queryParamMap.get('userId');
            var TranscriptData = await this.api.getAllTranscriptData(userId);
            this.TranscriptData =  TranscriptData['data']['userTranscripts'];
            this.email =  this.TranscriptData[0].email; 
        } catch (error) {
          console.error("Error", error)
        }
    }
  }

  handleChange(e,name,id,user_id) {
    let errataCheck = e.checked;
      this.errataTranscript.push({
        name:name,
        errataCheck : errataCheck,
        id:id,
        userId:user_id
      });
  }

 
  getstatement(name,id,user_id){
  this.dialogservice.open(StatementComponent, {
    context: {
      trans_name : name,
      userId:user_id,
      trans_id:id,
    },
  })
  }
  updateErrataTranscript(){
    if (this.errataTranscript.length > 0) {
      this.api.updateErrataTranscript(this.errataTranscript).subscribe(data=>{
            if(data['status'] == 200){
              this.confirmationService.confirm({
                message: 'Successfully Done Changes!!!',
                header: 'Confirmation',
                icon: 'pi pi-check',
                accept: () => {
              
                }
              });
            }
      });
    }
  }


  DownloadTranscript(file_path,name){
    this.api.downloadTranscript(file_path)
    .subscribe(data => {
      saveAs(data, name);    
    });
  }
  

  Back(){
    this._location.back();
  }

}
