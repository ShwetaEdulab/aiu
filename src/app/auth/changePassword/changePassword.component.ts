
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UserService } from '../../@core/data/users.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'changePassword',
  templateUrl: './changePassword.component.html',
})
export class changePasswordComponent {
  validation_messages;
  alertflag = 0;
  messagealertflag=0;

  @Input() userPassword:string;
  @Input() userConfirmPassword:string;

  changePasswordForm: FormGroup;

  readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
  email: string;
  user_email: any;
  
    constructor(
        private router : Router,
        protected api : ApiService,
        private fb: FormBuilder,
        public authService: NbAuthService,
        private route : ActivatedRoute) {
          this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        
        this.user_email = token.getPayload()['email'];
        console.log("IN settting change passsword incoming email===="+this.user_email);
      });
      }
      ngOnInit() { 
        this.changePasswordForm = this.fb.group({

        passwordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
        repasswordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],

        });

      }

      onSubmit(){
        this.changePasswordForm.controls.passwordCtrl.markAsDirty();
        this.changePasswordForm.controls.repasswordCtrl.markAsDirty();

        var userPassword= this.changePasswordForm.controls.passwordCtrl.value;
        var userConfirmPassword= this.changePasswordForm.controls.repasswordCtrl.value;


        if(userPassword =='' || userConfirmPassword ==''){
          this.alertflag = 1;
          this.validation_messages =  "Your form is not filled please fill completely";

        }else if (!(userPassword == userConfirmPassword)){
              this.alertflag = 2;
              this.validation_messages =  "Password doesn't match!";
        }
        else{
            if(userPassword.length<=6 && userConfirmPassword.length<=6){
                this.alertflag = 4;
                this.validation_messages =  "Use 6 or more characters,numbers or symbols ";
            }else{
                
                var changePasswordvalue={
                    userPassword:this.changePasswordForm.controls.passwordCtrl.value,
                    userConfirmPassword:this.changePasswordForm.controls.repasswordCtrl.value,
                    email:this.user_email
                }
    
                
                this.alertflag = 5;
                this.validation_messages =  "Your password and confirm password successfully match";

                this.api.resetPasswordValues(changePasswordvalue)
                .subscribe((data: any) => {
                    if(data['status'] == 200){
                    this.messagealertflag = 1;
                    this.router.navigate(['auth/logout']);
                    }else if(data['status'] ==400){
                    this.messagealertflag = 0; 
                    }else{

                    }
                    err => console.error(err)
                });
            }
        }
    }


      close() {
        this.alertflag = 0;
      }

      onClose() {
        this.messagealertflag = 0;
      }



      
      
      
  }