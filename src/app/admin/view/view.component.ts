import {Component} from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {Location} from '@angular/common';
import { saveAs } from 'file-saver';
import { config } from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class AdminViewComponent {
  studentData;
  userTranscripts;
  category;
  userId;
  courseId;
  applicationId;
  serverUrl = config.serverUrl;
  user_id: any;
  constructor(protected api : ApiService,
    private route: ActivatedRoute,
    private _location: Location,
    private authService : NbAuthService,
    private router : Router,
    ) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        this.user_id = token.getPayload()['id'];
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    
  }

  async ngOnInit(){
  try {
    this.category=this.route.snapshot.queryParamMap.get('category');
    this.userId=this.route.snapshot.queryParamMap.get('userId');
    this.courseId=this.route.snapshot.queryParamMap.get('courseId');
    this.applicationId=this.route.snapshot.queryParamMap.get('applicationId');
    var tab = this.route.snapshot.queryParamMap.get('tab');
    if(this.category==="studentmgmt"){      
      var viewAllData = await this.api.getAllStudentData(this.userId);
      this.studentData =  viewAllData['data'];
      //console.log("JSON.stringify()====>"+JSON.stringify(this.studentData));
      this.userTranscripts = viewAllData['data']['userTranscripts'];
    }

    } catch (error) {
      console.log("Error", error);
    }

}

preview(category){

  this.api.generatepreviewLetter(this.userId)
    .subscribe(data =>{
      if(data['status'] == 200){
        var filename = 'Preview_data.pdf'
        this.api.downloadFilesAdmin(data['data'],this.userId)
        .subscribe(data => {
          saveAs(data, filename);
        });
      }else if(data['status'] == 400){
        alert(data['message']);
      }
    })
 
    // this.api.preview(this.userId,this.courseId,this.applicationId).subscribe(data => {
    //   if(data[`status`] == 200){
    //     this.api.downloadFiles(data[`data`])
    //     .subscribe(data => {
    //       saveAs(data, this.applicationId+'_Preview.pdf');    
    //     });
       
    //   }else{
    //     alert("You Can't Download Preview Letter!!!!!!")
    //   }
  
    // })

}

DownloadTranscript(file_path,name,userID){
  this.api.downloadFilesAdmin(name,userID)
  .subscribe(data => {
    saveAs(data, name);    
  });
}

Back(){
  this._location.back();
}
}
