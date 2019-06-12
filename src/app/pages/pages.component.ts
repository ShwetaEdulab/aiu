import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { ApiService } from '../shared/api.service';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  show;
  constructor(
    protected api: ApiService,
    private accessChecker: NbAccessChecker
  ) {

  }

  ngOnInit() {
    this.authMenuItems();
    var checkapplications =  this.api.checkapplications();
    checkapplications.subscribe(
      (data: any) => {
        if(data['status']== 200){
          this.show = 'true';
          this.showMyApplication();
        }else if(data['status']== 400){
          this.show = 'false';
          this.showMyApplication();
        }else{
          this.show = 'false';
          this.showMyApplication();
        }
      },
      error => {
        console.error("Error", error);
      }
    )
  }

  showMyApplication(){
    for (var a in MENU_ITEMS){
      if(MENU_ITEMS[a].title == 'My Applications'){
        if(this.show == 'false'){
          MENU_ITEMS[a].hidden = true;
        }else{
          MENU_ITEMS[a].hidden = false;
        }
      }
    }
  }

  authMenuItems() {
    this.menu.forEach(item => {
      this.authMenuItem(item);
    });
  }

  authMenuItem(menuItem: NbMenuItem) {
    if (menuItem.data && menuItem.data['permission'] && menuItem.data['resource']) {
      this.accessChecker.isGranted(menuItem.data['permission'], menuItem.data['resource']).subscribe(granted => {
        menuItem.hidden = !granted;
      });
    } else {
      menuItem.hidden = true;
    }
    if (!menuItem.hidden && menuItem.children != null) {
      menuItem.children.forEach(item => {
        if (item.data && item.data['permission'] && item.data['resource']) {
          this.accessChecker.isGranted(item.data['permission'], item.data['resource']).subscribe(granted => {
            item.hidden = !granted;
          });
        } else {
          // if child item do not config any `data.permission` and `data.resource` just inherit parent item's config
          item.hidden = menuItem.hidden;
        }
      });
    }
  }
}
