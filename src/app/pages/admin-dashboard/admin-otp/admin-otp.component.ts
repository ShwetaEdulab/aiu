import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-admin-otp',
  templateUrl: './admin-otp.component.html',
  styleUrls: ['./admin-otp.component.scss']
})
export class AdminOtpComponent {
  otp: any;
  alert: any;
  alertflag: number;
  user_id: any;
  enterOtp:any;
  otpValidation: boolean;
  constructor(private router : Router,
    private route : ActivatedRoute,
    protected api : ApiService,
    private authService : NbAuthService) {
      this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    }

  ngOnInit() {
    this.api.sendOtp().subscribe(data=>{
      if(data['status'] == 200){
        this.otp = data['data']
      }
    })
  }

  cancel(){
    this.router.navigate(['auth/logout']);
  }


  verify(){
    this.enterOtp = (document.getElementById('enterOtp') as HTMLInputElement).value;
    if(this.otp === this.enterOtp){  
        this.api.updateOtp().subscribe(data=>{
          if(data['status'] == 200){
            this.router.navigate(['pages/admin-dashboard'])
          }
        })       
    }else{
      this.otpValidation = false;
      
    }
  }
}
