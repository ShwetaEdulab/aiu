import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbThemeService } from '@nebular/theme/services/theme.service';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
  selector: 'ngx-myapplications',
  templateUrl: './myapplications.component.html',
  styleUrls: ['./myapplications.component.scss'],
  providers:[HeaderComponent],
})
export class MyapplicationsComponent implements OnInit {
  email;
  myappForm: FormGroup;
  my_app_data: any;
  constructor(protected api : ApiService,
    protected router : Router,
    private fb: FormBuilder,
    private userService: UserService,
    public themeService: NbThemeService,
    private comp: HeaderComponent,
  ) { }

  ngOnInit() {

                  this.api.My_pplication().subscribe(response => {
                    //console.log('getting my applications==========>');
                    this.my_app_data = response['data'];
                   // console.log('this.my_app_data==========>'+this.my_app_data);
                  });

                  this.myappForm = this.fb.group({
                    emailName: ['', Validators.required],
                  });

                  this.userService.onUserChange()
                  .subscribe((Application: any) => {
                    this.email = Application['email'];
                  });


  }

  myapplicationsRoutes(){
    this.router.navigate(['pages/myapplications']);
  }

}
