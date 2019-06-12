import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ngx-sub-admin-dashboard',
  templateUrl: './sub-admin-dashboard.component.html',
  styleUrls: ['./sub-admin-dashboard.component.scss']
})
export class SubAdminDashboardComponent implements OnInit {
  user: any;
  constructor(private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.onUserChange()
    .subscribe((user: any) => this.user = user);
    setTimeout(() => {
      this.snackBar.openFromComponent(SubAdminSnackComponent, {
        duration: 500,
      });
    });
  }
  onChangeTab(event){
    console.log("event "+ JSON.stringify(event.tabTitle));
  }
}
@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span> Welcome Sub-Admin ! </span>`
  
})
export class SubAdminSnackComponent {}