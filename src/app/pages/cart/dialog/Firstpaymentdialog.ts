import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
selector: 'nb-dialog',
template: `

<nb-card status="success">
  <nb-card-header style="text-align:center;font-size: 150%;">Email</nb-card-header>
  <nb-card-body>
    <div class="container">
        <input type="text" class="form-control" id="update_email" value="{{email}}" [(ngModel)]="email"><br>     
    </div>
  <nb-card-footer>
    <button nbButton (click)="setNewValue()">Update</button>
  </nb-card-footer>
  </nb-card-body>
</nb-card> 

`,
})
export class Firstpaymentdialog {
  @Input() email: string;
  data: any;
  old_email ; 
  user_id;

  constructor(protected ref: NbDialogRef<Firstpaymentdialog>,
    protected api : ApiService
  ) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
    this.old_email = this.email;
  }
  
  async setNewValue(){
    var updated_email = this.email;
    var result = await this.api.emailupdate(this.old_email,updated_email);
    result.subscribe(data => {
      this.ref.close();
    },
    error => {
      console.error("Error", error);
    }
	  )
  }
}