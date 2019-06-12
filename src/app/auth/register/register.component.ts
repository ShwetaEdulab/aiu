/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {  Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import { ApiService } from '../../shared/api.service';
import { CountriesService } from '../../@core/data/countries.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NbDateService,NbDialogService,NbToastrService } from '@nebular/theme';
import { TermsComponent } from './terms.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {ConfirmationService} from 'primeng/api';
import { ConfirmPassComponent } from './confirmPass.component';
import { Router } from '@angular/router';
//import { MatRadioModule } from '@angular/material';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent{

	email:any;
	RegisterForm: FormGroup;
	alertflag = 0;///this is for  submit button
	messgealertflag = 0;
	messages;
	validation_messages;
	//permCountry;
	selectedGender;
	selectedOption;
	//selectedCategory;
	//Country;
	max = new Date();
	date;
	captcha;
	country_id;
	profile_info;
//countryValidation = false;
  //	selectedCountry;
	svg:SafeHtml;
 	captchaText;
	 values = '';
	 emailAlert = false;
	 display: boolean = false;
	 displayNo: boolean = false;
	 emailValue;

	 Countries: any [];
	 selectedCountry :any;
	 permCountry:any;

  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly charValidate = /^[.a-zA-Z ]*$/;
//  readonly nationalValidate = /^(?![0-9]*$)[A-Za-z0-9 ]+$/;
 // readonly passportValidate = /^[a-zA-Z0-9]*$/;
 readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
  readonly mobileValidate =/^[0-9]\d{5,12}$/;
readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
 
  constructor(
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
    protected countries :CountriesService,
     private dialogService: NbDialogService, //on submit dialog box
     private messageService: MessageService,
     private toastrService: NbToastrService,
		 private sanitizer: DomSanitizer,
		 private confirmationService: ConfirmationService,
		 private router : Router,
		
    )
     {  
    this.Countries = this.countries.getData();
    
    }

    ngOnInit() {

      this.buildForm1();     
     
      this.RegisterForm = this.fb.group({
        firstNameCtrl: ['', [ Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
       LastNameCtrl: ['', [ Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
        emailCtrl: ['', [ Validators.required, Validators.pattern(this.emailValidate)]], // Validators.pattern("^[0-9]*$")
		passwordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
		repasswordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
		//dobCtrl:['',[Validators.required]],
		//genderCtrl: [ '', [ Validators.required]],
		//countryCtrl:['', Validators.required],
        //cityCtrl:['', [ Validators.required, Validators.maxLength(30),Validators.minLength(2)]],
        //PostCodeCtrl:['', [ Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10),Validators.minLength(5)]],
		moCountryCtrl:['', Validators.required],
		mophonecodeCtrl:['',Validators.required ],
        phoneCtrl:['', [ Validators.required, Validators.pattern(this.mobileValidate)]],
		captchaCtrl:['', Validators.required],
		//my_radio_option :['', Validators.required],
      });
    }
              
    private buildForm1() : void{
      this.api.getCaptcha()
      .subscribe(
        (data: any) => {  
          this.captchaText = data['data']['captchaText'];
          this.captcha =  data['data']['captchadata'];
          this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
        err => console.error(err)
      });
    }
	
  	checkcaptcha(duration,status){
		if(!(this.RegisterForm.controls.captchaCtrl.value == this.captchaText)){		
			this.toastrService.show(       
				`checkcaptcha doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "checkcaptcha doesn't match!";
			this.RegisterForm.controls.captchaCtrl.markAsDirty();
			
		}
	}
	reloadcaptcha(){
		this.api.getCaptcha()
		.subscribe(
			(data: any) => {  
				this.captchaText = data['data']['captchaText'];
				this.captcha =  data['data']['captchadata'];
				this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
			err => console.error(err)
		});
	}
	checkpassword(duration,status){
		if(this.RegisterForm.controls.passwordCtrl.value != this.RegisterForm.controls.repasswordCtrl.value){		

			this.toastrService.show(       
				'Password doesnt match ! ! ', {duration},{status}
      		);
			this.validation_messages =  "Password doesn't match!";
			this.RegisterForm.controls.passwordCtrl.markAsDirty();
		}
	}



onSubmit(duration,status){


	
	var check_validation;
	this.RegisterForm.controls.firstNameCtrl.markAsDirty();
	this.RegisterForm.controls.LastNameCtrl.markAsDirty();  
	this.RegisterForm.controls.emailCtrl.markAsDirty();
	this.RegisterForm.controls.passwordCtrl.markAsDirty();
	this.RegisterForm.controls.repasswordCtrl.markAsDirty();
	//this.RegisterForm.controls.dobCtrl.markAsDirty();
	//this.RegisterForm.controls.genderCtrl.markAsDirty();  
	//this.RegisterForm.controls.countryCtrl.markAsDirty();		
	//this.RegisterForm.controls.cityCtrl.markAsDirty();   
	//this.RegisterForm.controls.PostCodeCtrl.markAsDirty();
	this.RegisterForm.controls.moCountryCtrl.markAsDirty();
	this.RegisterForm.controls.mophonecodeCtrl.markAsDirty();
	this.RegisterForm.controls.phoneCtrl.markAsDirty();
	this.RegisterForm.controls.captchaCtrl.markAsDirty();
	//this.RegisterForm.controls.my_radio_option.markAsDirty();
	
	
	
					if(this.RegisterForm.controls.passwordCtrl.value == this.RegisterForm.controls.repasswordCtrl.value){
						if(this.RegisterForm.valid){	
							if(this.RegisterForm.controls.captchaCtrl.value == this.captchaText){	
								check_validation = true;
								this.alertflag = 0;
							}else{
								this.reloadcaptcha();
								this.toastrService.show(       
									`checkcaptcha doesn't match ! ! `, {duration},{status}
									);	
							}			
						}else{			
							this.reloadcaptcha();			
							check_validation = false;
							this.alertflag = 1;
							this.validation_messages =  "Fill in the all required details !";
						}
					}else{
						this.alertflag = 1;
						this.toastrService.show(       
							`Password doesn't match ! ! `, {duration},{status}
								);
						this.validation_messages =  "Password doesn't match!";

					}
				if(check_validation){
					this.alertflag = 0;
						this.dialogService.open(TermsComponent, {
							context: {
								userName : this.RegisterForm.controls.firstNameCtrl.value,
								Surname: this.RegisterForm.controls.LastNameCtrl.value,
								userEmail : this.RegisterForm.controls.emailCtrl.value,
								userPassword : this.RegisterForm.controls.passwordCtrl.value,
								//userDob : this.RegisterForm.controls.dobCtrl.value,
								//Gender : this.RegisterForm.controls.genderCtrl.value,
								//Country:this.RegisterForm.controls.countryCtrl.value,
								//userCity: this.RegisterForm.controls.cityCtrl.value,
								//postal_code : this.RegisterForm.controls.PostCodeCtrl.value,
								userCountryCode : this.RegisterForm.controls.mophonecodeCtrl.value,
								userContactNo : this.RegisterForm.controls.phoneCtrl.value,
								//user_option : this.RegisterForm.controls.my_radio_option.value,
							},
						});
					}else{
					this.alertflag = 1;
					if(this.validation_messages != null){
						this.messages = this.validation_messages;
					}else{
						this.messages = "Your form is not filled please fill completely";
					}
					}
				 
					

}

// disablestate(country_id){
// 	this.country_id = country_id;
// 	if(country_id === 1 ){
// 	  document.getElementById('inputState').style.visibility = 'hidden';
// 	  document.getElementById('State').style.visibility = 'hidden';
// 	}else if(country_id === 154){
// 	  this.RegisterForm.get('StateCtrl').clearValidators();
// 	  this.RegisterForm.get('StateCtrl').updateValueAndValidity();
// 	 document.getElementById('inputState').style.visibility = 'hidden';
// 	  document.getElementById('State').style.visibility = 'hidden';
// 	  document.getElementById('inputPremPost').style.visibility = 'hidden';
// 	  document.getElementById('Postal').style.visibility = 'hidden';     
// 	}else{
// 	  this.RegisterForm.get('StateCtrl').setValidators([Validators.required, Validators.maxLength(30),Validators.minLength(2)]);
// 	  this.RegisterForm.get('StateCtrl').updateValueAndValidity();
// 	  //this.RegisterForm.get('PostCodeCtrl').setValidators([ Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10),Validators.minLength(5)]);
// 	  //this.RegisterForm.get('PostCodeCtrl').updateValueAndValidity();
// 	  document.getElementById('inputState').style.visibility = 'visible';
// 	  document.getElementById('State').style.visibility = 'visible';
// 	  document.getElementById('inputPremPost').style.visibility = 'visible';
// 	  document.getElementById('Postal').style.visibility = 'visible';
// 	}
// }





  onClose(){
    this.messgealertflag = 0;
	}

	onEmailClose(){
		this.emailAlert = false;
	}

  close() {
    this.alertflag = 0;
  }
  showResponse(event) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
}

onValueChange(event){
  
	var phonecode;
	var permittedValues = this.Countries.map(function(value) {
	  if(value.id == event){
	   phonecode = value.phonecode;
	  }
	 });
	 if(phonecode!=null || phonecode!=undefined ){
	   this.profile_info = phonecode;
	 } 
   }

}
