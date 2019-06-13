import {
  Component,
  OnInit
} from '@angular/core';

import {
  UserService
} from '../../@core/data/users.service';
import {
  MatSnackBar
} from '@angular/material';
import {
  ActivatedRoute
} from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})



export class AdminDashboardComponent implements OnInit {
  user: any;
  total: boolean = false;
  pending: boolean = false;
  verified: boolean = false;
  signed: boolean = false;
  signed_namrata: boolean = false;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    protected router : Router,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.tab)
      .subscribe(params => {
        if (params.tab == 'total') {
          this.total = true;
          this.pending = false;
          this.verified = false;
          this.signed = false;
          this.signed_namrata = false;
        } else if (params.tab == 'pending') {
          this.pending = true;
          this.total = false;
          this.verified = false;
          this.signed = false;
          this.signed_namrata = false;
        } else if (params.tab == 'verified') {
          this.verified = true;
          this.signed = false;
          this.pending = false;
          this.total = false;
          this.signed_namrata = false;
        } else if (params.tab == 'signed') {
          this.signed = true;
          this.pending = false;
          this.verified = false;
          this.total = false;
          this.signed_namrata = false;
        }  else if (params.tab == 'signed_namrata') {
          this.signed = false;
          this.pending = false;
          this.verified = false;
          this.total = false;
          this.signed_namrata = true;
        }
      });
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);

    setTimeout(() => {
      this.snackBar.openFromComponent(AdminSnackComponent, {
        duration: 500,
      });
    });
  }

  onChangeTab(event) {
    console.log("event " + JSON.stringify(event.tabTitle));
    if(event.tabTitle == "Total Applications"){
      //this.router.navigate(['pages/admin-dashboard/total']);
    }else if(event.tabTitle == "Pending Applications"){

    }
  }
}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span> Welcome Admin ! </span>`

})
export class AdminSnackComponent {}
