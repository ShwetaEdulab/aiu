import {
  saveAs
} from 'file-saver';
import {
  Component,
  OnInit,
  ViewChild,
  Injectable,
  ChangeDetectorRef
} from '@angular/core';
import {
  ApiService
} from '../../shared/api.service';
import {
  Router
} from '@angular/router';

import {
  NbAuthService,
  NbAuthJWTToken
} from '@nebular/auth';
//////////for user name
import {
  UserService
} from '../../@core/data/users.service';
import {
  Observable
} from 'rxjs';
import * as io from 'socket.io-client';
import {
  jsonpCallbackContext
} from '@angular/common/http/src/module';
import { config } from '../../../../config';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers:[HeaderComponent],
})
@Injectable()
export class DashboardComponent implements OnInit {
  socket: SocketIOClient.Socket;
  stepperFlag : Boolean = false;
  allDataFetched: boolean = false;
  linearMode = true;
  @ViewChild('progressStepper') stepper;
  @ViewChild('progress2Stepper') stepper2;
  user: any;
  cartCheck: boolean;
  message: string;
  alertFlag: number;
  statusflag: number;
  preapplyFlag: boolean;
  applyFlag: boolean;
  verificationFlag: boolean;
  verifiedFlag: boolean;
  doneFlag: boolean;
  length: number;
  application: any;
  applicationID: any;
  courseID: any;
  screenWidth: number;
  screenHeight: number;

  isLinear = false;
  statusflag1: boolean;
  statusflag2: boolean;
  statusflag3: boolean;
  statusflag4: boolean;
  statusflag5: boolean;
  track_status: any;
  id;
  processing: boolean;
  currentStep: number;
  dropdownFlag: boolean = false;
  applicationData: any;
  Appc_id: any;
  num: number;
  selecttStep: any;

  constructor(protected api: ApiService,
    protected router: Router,
    public authService: NbAuthService,
    private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private comp: HeaderComponent,
    // private socket : SocketService,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        
        this.id = token.getPayload()['id'];
        if (token.isValid()) {
          if (token.getPayload()['role'] == 'admin') {
            this.router.navigate(['pages/admin-dashboard']);
          } else if (token.getPayload()['role'] == 'sub-admin') {

            this.router.navigate(['pages/sub-admin-dashboard']);
          }
        }

      });
  }

  async ngOnInit(): Promise < void > {
   
    this.userService.onUserChange()
    .subscribe((user: any) => this.user = user);
    // this.socket = io(config.socketioUrl);
    // //this.socket.on()
    // this.socket.on('tracker', servermsg => {
    //   this.refresh();
    // })
    // this.refresh();
    // this.socket.on('trackdropdown', servermsg => {
    //   this.reset(); 
    // });
    // this.reset(); 
    
    
    var applications = await this.api.getApplicationdetails().subscribe(data => {
      this.application = data['data'];
      this.length = data['length'];
      if (this.length == 1) {
        this.dropdownFlag = false;
        this.refresh();
       
      } else if (this.length > 1) {
        this.dropdownFlag = true;
       
        this.applicationData = data['data'];
        // this.reset();
       }
    });
  }

//  reset(){
//   this.socket.emit('trackdropdown',this.Appc_id, pri_re => {
//     //console.log("pri_re============>"+pri_re);
//   });
//     this.api.getStatuswithid(this.Appc_id).subscribe(
//       res => {
       
//       if(res['data']!= null){
        
//               var step = res['data']['tracker'];
//               if (step === 'preapply') {
//                 this.statusflag = 1;
//                 this.statusflag1 = true;
//                 this.preapplyFlag = true;
//                 this.applyFlag = false;
//                 this.verificationFlag = false;
//                 this.verifiedFlag = false;
//                 this.doneFlag = false;
//                 this.isLinear = true;
//               } else if (step === 'apply') {
//                 this.statusflag = 2;
//                 this.statusflag2 = true;
//                 this.preapplyFlag = true;
//                 this.applyFlag = true;
//                 this.verificationFlag = false;
//                 this.verifiedFlag = false;
//                 this.doneFlag = false;
//                 this.isLinear = true;
//               } else if (step === 'verification') {
//                 this.statusflag = 3;
//                 this.statusflag3 = true;
//                 this.preapplyFlag = true;
//                 this.applyFlag = true;
//                 this.verificationFlag = true;
//                 this.verifiedFlag = false;
//                 this.doneFlag = false;
//                 this.isLinear = true;
//               } else if (step === 'verified') {
//                 this.statusflag = 4;
//                 this.statusflag4 = true;;
//                 this.preapplyFlag = true;
//                 this.applyFlag = true;
//                 this.verificationFlag = true;
//                 this.verifiedFlag = true;
//                 this.doneFlag = false;
//                 this.isLinear = true;
//               } else if (step === 'done') {
              
//                 this.statusflag = 5;
//                 this.statusflag5 = true;
              
//                 this.preapplyFlag = true;
//                 this.applyFlag = true;
//                 this.verificationFlag = true;
//                 this.verifiedFlag = true;
//                 this.doneFlag = true;
//                 this.isLinear = true;
//               }
//               this.stepperFlag = true;
//             this.allDataFetched = true;
//            }
//     });
// }
 setAPP_id(id) {
    this.Appc_id = id;
    // this.reset();
  }
 move(index: number) {
    this.num=this.stepper.selectedIndex = index;
    return index;
}
refresh(): any {
    this.stepperFlag = true;
    this.socket.emit('tracker', this.id, pre_re => {
      
    });
    if (this.dropdownFlag === false) {
     
      this.api.getStatus().subscribe(
        result => {
          
          if(result['data']!= null){
          var step = result['data']['tracker'];
          if (step === 'preapply') {
          
            this.statusflag = 1;
            this.statusflag1 = true;
            this.preapplyFlag = true;
            this.applyFlag = false;
            this.verificationFlag = false;
            this.verifiedFlag = false;
            this.doneFlag = false;
            this.isLinear = true;
          } else if (step === 'apply') {
          
            this.statusflag = 2;
            this.statusflag2 = true;
            this.preapplyFlag = true;
            this.applyFlag = true;
            this.verificationFlag = false;
            this.verifiedFlag = false;
            this.doneFlag = false;
            this.isLinear = true;
          } else if (step === 'verification') {
         
            this.statusflag = 3;
            this.statusflag3 = true;
            this.preapplyFlag = true;
            this.applyFlag = true;
            this.verificationFlag = true;
            this.verifiedFlag = false;
            this.doneFlag = false;
            this.isLinear = true;
          } else if (step === 'verified') {
          
            this.statusflag = 4;
            this.statusflag4 = true;;
            this.preapplyFlag = true;
            this.applyFlag = true;
            this.verificationFlag = true;
            this.verifiedFlag = true;
            this.doneFlag = false;
            this.isLinear = true;
          } else if (step === 'done') {
         
            this.statusflag = 5;
            this.statusflag5 = true;
            
            this.preapplyFlag = true;
            this.applyFlag = true;
            this.verificationFlag = true;
            this.verifiedFlag = true;
            this.doneFlag = true;
            this.isLinear = true;
          }
        }
        }); 
    } 
    /**@ PRIYANKA
     * COMMENTED BELOW ONE LINE
     */
   this.changeDetectorRefs.detectChanges();
    
  }
 // save_outage_index() {
  //   console.log('click');
  // }
  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

//   resetStepper(num){
//     //this.stepper.selectedIndex = 0;
//     if(num === 2){
//       return this.stepper2.selectedIndex = 0;
//     }
//  }
  selectStep() {
  
    if (this.stepper.selectedIndex == 0) {
      if (this.preapplyFlag == true) {

        this.message = "You have completed preapply state";
        this.alertFlag = 1;
        this.timer();
      } else if (this.preapplyFlag === false) {

        this.message = "You have not apply for application of attestation";
        this.alertFlag = 1;
        this.timer();
      }

    } else if (this.stepper.selectedIndex == 1) {
     
      if (this.applyFlag == true) {
        
        this.message = "You have successfully applied for application of attestation";
        this.alertFlag = 1;
        this.timer();
      } else if (this.preapplyFlag == true && this.applyFlag == false) {
        this.message = "You have not applied for application of attestation";
        this.alertFlag = 1;
        this.timer();
      } else if (this.applyFlag == false) {
        this.message = "first You have to apply for application";
        this.alertFlag = 1;
        this.timer();
      } else {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      }

    } else if (this.stepper.selectedIndex == 2) {
    
      if (this.verificationFlag === true) {

        this.message = "verification done";
        this.alertFlag = 1;
        this.timer();
      } else if (this.applyFlag === true && this.verificationFlag === false) {
        this.message = "You have applied for application but it did not reach at verification pannel till now";
        this.alertFlag = 1;
        this.timer();
      } else if (this.verificationFlag === false) {
        this.message = "This step not completed";
        this.alertFlag = 1;
        this.timer();
      } else {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      }
    } else if (this.stepper.selectedIndex == 3) {

      if (this.verifiedFlag === true) {

        this.message = "Your application successfully verified";
        this.alertFlag = 1;
        this.timer();
      } else if (this.verificationFlag === true  && this.verifiedFlag === false) {
        this.message = "Your application not verified till now";
        this.alertFlag = 1;
        this.timer();
      } else if (this.verifiedFlag === false) {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      } else {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      }

    } else if (this.stepper.selectedIndex == 4) {
    
      if (this.doneFlag === true) {

        this.message = "Congratulations! Your application has been signed and it is send to your mail id ";
        this.alertFlag = 1;
        this.timer();
      } else if (this.verifiedFlag === true  && this.doneFlag === false) {
        this.message = "Sorry! Your application is verified but not signed yet.";
        this.alertFlag = 1;
        this.timer();
      } else if (this.doneFlag === false) {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      } else {
        this.message = "You have to wait for previous steps to be completed";
        this.alertFlag = 1;
        this.timer();
      } }
 
    }
  selectStep2() {
     if (this.stepper2.selectedIndex == 0) {
       if (this.preapplyFlag == true) {
 
         this.message = "You have completed preapply state";
         this.alertFlag = 1;
         this.timer();
       } else if (this.preapplyFlag === false) {
 
         this.message = "You have not apply for application of attestation";
         this.alertFlag = 1;
         this.timer();
       }
     } else if (this.stepper2.selectedIndex == 1) {
      
       if (this.applyFlag == true) {
         
         this.message = "You have successfully applied for application of attestation";
         this.alertFlag = 1;
         this.timer();
       } else if (this.preapplyFlag == true && this.applyFlag == false) {
         this.message = "You have not applied for application of attestation";
         this.alertFlag = 1;
         this.timer();
       } else if (this.applyFlag == false) {
         this.message = "first You have to apply for application";
         this.alertFlag = 1;
         this.timer();
       } else {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
       }
     } else if (this.stepper2.selectedIndex == 2) {
  
       if (this.verificationFlag === true) {
 
         this.message = "verification done";
         this.alertFlag = 1;
         this.timer();
       } else if (this.applyFlag === true && this.verificationFlag === false) {
         this.message = "You have applied for application but it did not reach at verification pannel till now";
         this.alertFlag = 1;
         this.timer();
       } else if (this.verificationFlag === false) {
         this.message = "This step not completed";
         this.alertFlag = 1;
         this.timer();
       } else {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
       }
     } else if (this.stepper2.selectedIndex == 3) {
   
       if (this.verifiedFlag === true) {
 
         this.message = "Your application successfully verified";
         this.alertFlag = 1;
         this.timer();
       } else if (this.verificationFlag === true  && this.verifiedFlag === false) {
         this.message = "Your application not verified till now";
         this.alertFlag = 1;
         this.timer();
       } else if (this.verifiedFlag === false) {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
       } else {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
       }
     } else if (this.stepper2.selectedIndex == 4) {

       if (this.doneFlag === true) {
 
         this.message = "Congratulations! Your application has been signed and it is send to your mail id.";
         this.alertFlag = 1;
         this.timer();
       } else if (this.verifiedFlag === true  && this.doneFlag === false) {
         this.message = "Sorry! Your application is verified but not signed yet.";
         this.alertFlag = 1;
         this.timer();
       } else if (this.doneFlag === false) {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
       } else {
         this.message = "You have to wait for previous steps to be completed";
         this.alertFlag = 1;
         this.timer();
         
       } 
      
    }
     
   }

  onClose() {
    this.alertFlag = 0;
    this.ngOnInit();
  }

  timer() {
    setTimeout(() => {
      this.alertFlag = 0;
    }, 5000);
  }
  ////////////////////screenWidth
  // setOrientation(){
  //   if(this.screenWidth < 500){
  //     this.stepper.orientation = "vertical";
  //   }else{
  //     this.stepper.orientation = "horizontal";
  //   }
  // }
  getScreenSize(event ? ) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  dashboardRoutes(data) {
    this.router.navigate(['pages/dashboard/' + data]);
  }

}
