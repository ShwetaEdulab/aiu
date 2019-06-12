import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { HeaderComponent } from '../../@theme/components/header/header.component';
@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[HeaderComponent],
})
export class SettingsComponent implements OnInit {

  constructor(private api : ApiService,
    private route: ActivatedRoute,
     private router: Router,
     public themeService : NbThemeService,
     private comp: HeaderComponent) { }


  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
  }

  changePassword(){
    this.router.navigateByUrl('/auth/changePassword');
  }

}
