import {Component, Inject} from '@angular/core';

import {
	Router
} from '@angular/router';
import {
	ApiService
} from '../../shared/api.service';
import {
	NbDateService,
	NbDialogService,
	NbThemeService
} from '@nebular/theme';
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import {
	HeaderComponent
} from '../../@theme/components/header/header.component';

import {
	Firstpaymentdialog
} from './dialog/Firstpaymentdialog';

import {
	PaymentComponent
} from './dialog/payment.component';

import {
	UserService
} from '../../@core/data/users.service';

@Component({
	selector: 'cart',
	styleUrls: ['./cart.component.scss'],
	templateUrl: './cart.component.html',
	providers: [HeaderComponent],
})

export class CartComponent {
	cnt = 0;
	email;
	httpClient: any;
	flag: boolean;
	total: number = 0;
	delit: number = 0;
	user_email: any;
	user_email1;
	user_fees: any;
	id1;
	payment1;
	payment_status1;
	user_id: any;
	id: any;
	course: any;
	status: any;
	payment_status: any;
	course_name: any;
	institute_name: any;
	getvalue: any;
	retrieveData: any;
	applications_data: any =[];
	email_created;
	getval;
	public index: number;
  	courseid: any;
	college_course: any;
	coursecartdata: any;
	total_amount;

	constructor(private api: ApiService,
		protected dateService: NbDateService < Date > ,
		private dialogService: NbDialogService,
		public themeService: NbThemeService,
	){
	}

	async ngOnInit() {
		this.api.Details().subscribe(response => {
			this.coursecartdata = response['data']['course'];	
			console.log('this.coursecartdata.length========>'+this.coursecartdata.length);
			this.total_amount = response['total_amount'];
			console.log('this.total_amount==========>'+this.total_amount);
		});
	}

	openDialog(email){
		this.dialogService.open(Firstpaymentdialog, {
			context: {
				email : email,
			},
		}).onClose
		.subscribe(
			(name: any) => {
				this.ngOnInit();
			}
		)
	}

	async remove(id,institute_id){	
		if (window.confirm('Are you sure you want to delete?')) {
			var result = await this.api.cartRemove(id,institute_id);
			result.subscribe(data => {
			  if(data['status'] == 200){
				window.alert('Record deleted successfully');
				this.ngOnInit();
			  }else if(data['status'] == 400){
				window.alert('Problem in deleting record.Please try again!!!!!!');
			  }     
			});
		}else {
			this.ngOnInit();
		}
	}

	Procced(){
		console.log('open dialogue box here');
		this.dialogService.open(PaymentComponent, {
			context: {
				total_amount : this.total_amount,
			},
		});	
	}
}

