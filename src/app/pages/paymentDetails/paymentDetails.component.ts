import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../shared/api.service';
import 'rxjs/Rx';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,FormBuilder,Validators, ValidatorFn } from '@angular/forms';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../@core/data/users.service';
import { NbToastrService, NbDialogService, NbStepperComponent } from '@nebular/theme';
import {config} from '../../../../config';

@Component({
  selector: 'ngx-paymentDetails',
  templateUrl: './paymentDetails.component.html',
  styleUrls: ['./paymentDetails.component.scss'],
})
export class paymentDetailsComponent implements OnInit {


  constructor(protected api : ApiService,
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private authService: NbAuthService,
    private userService: UserService,
    private toastrService: NbToastrService
    ){

  }

  paymentData;
  ngOnInit() {
    this.api.getAllPayments().subscribe(data  =>{
        console.log('data[data].length======>'+data['data'].length);
        this.paymentData = data['data'];
    });
  }

}

