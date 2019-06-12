import { Component, Input } from '@angular/core';
import { NbDialogRef,NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthService } from '@nebular/auth';

@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card class="col-md-12" status="success">
			<nb-card-header>
				<div class="row">
					<div class="col-md-3">
					</div>
					<div class="col-md-6">
						<h5 style="color:#ffffff">CONFIRM PASSWORD</h5>
					</div>
					<div class="col-md-3">
					</div>
				</div>
			</nb-card-header>
			<form [formGroup]="ConfirmPassForm">
				<nb-card-body>
					<div class="row">
						<div class="col-md-12">
							Enter Password For Login
						</div>
					</div>
					<br>
					<br>
					<div class="row">
						<div class="col-md-12">
							<input type="text" nbInput placeholder="Enter password here" formControlName="confPass" class="form-control" [ngClass]="{ 'is-invalid': passsubmitted && this.ConfirmPassForm.controls.confPass.errors }">
						</div>
					</div>
					<br>
					<div *ngIf="passsubmitted && this.ConfirmPassForm.controls.confPass.errors">
						<div *ngIf="this.ConfirmPassForm.controls.confPass.errors.required">
							<font color='red' face="verdana" size="2">
								Password is required
							</font>
						</div>
						<div *ngIf="this.ConfirmPassForm.controls.confPass.errors.pattern">
							<font color='red' face="verdana" size="2">
								Input valid password
							</font>
						</div>
					</div>
					<div *ngIf="invalidPass == 1">
						<font color='red' face="verdana" size="2">
							Please Input valid password
						</font>
					</div>
				</nb-card-body>
				<nb-card-footer>
					<div class="row">
						<div class="col-md-3">
						</div>
						<div class="col-md-3">
							<button nbButton status="success" (click)="confirm_Pass()">LOGIN</button>
						</div>
						<div class="col-md-5">
						</div>
					</div>
				</nb-card-footer>
			</form>
    </nb-card>
    `,
    })

export class ConfirmPassComponent {
@Input() email:string;
ConfirmPassForm : FormGroup;
passsubmitted = false;
invalidPass = 0;
readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;


    constructor(protected ref: NbDialogRef<ConfirmPassComponent>,
      private router : Router,
			protected api : ApiService,
			private formBuilder: FormBuilder,
			public auth : NbAuthService
			) {
		}
		
		ngOnInit(){
			this.ConfirmPassBuild();
		}

		confirm_Pass(){
			this.passsubmitted = true;
			if (this.ConfirmPassForm.invalid) {
				return;
			}else{
				this.api.confirmPass(this.email,this.ConfirmPassForm.controls.confPass.value)
				.subscribe(
					(data : any) => {
						if(data['status'] == 200){
							console.log('data[data]====>'+data['data']);
							this.invalidPass = 0;
						//	this.api.insert_to_database(data['data'])
							//.subscribe(
							//	(data1 : any) =>{
							//		console.log('data1[status]==>'+data1['status']);
							//		if(data1['status'] == 200){
										//todo code for login directly
										this.ref.close('done');
										this.router.navigate(['/auth/login']);
										console.log('do code for login');
										this.api.login(this.email,this.ConfirmPassForm.controls.confPass.value)
										.subscribe(
											(data2 : any) =>{
												console.log('data2[status]======>'+data2['status']);
												this.ref.close();
												if(data2['status'] == 200){
													console.log('redirecting to dashboard page');
													console.log('data2[data]===>'+data2['data']['token']);
													console.log("isAuthenticated()  :"+JSON.stringify(this.auth.isAuthenticated()));
													this.auth.authenticate('email', {email: 'priyankadivekar@sharklasers.com', password: 'Priya_9028'})					
													console.log("isAuthenticated()  :"+JSON.stringify(this.auth.isAuthenticated()));
													this.router.navigate(['/pages/dashboard']);
												}else if(data2['status'] == 402){
													console.log('open popup for otp');
												}
											}
										)
									// }else if(data1['status'] == 400){
									// 	console.log('error while inserting data');
									// }
							//	}
							//)
						}else if(data['status'] == 400){
							this.invalidPass = 1;
						}
					}
				)
			}
		}

		private ConfirmPassBuild() : void{
			this.ConfirmPassForm = this.formBuilder.group({
				confPass:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
			});
		}

}