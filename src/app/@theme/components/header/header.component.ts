import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { ApiService } from '../../../shared/api.service';
import * as io from 'socket.io-client';
import { config } from '../../../../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  notification_no;
  deleteShow: boolean;
  notification;
  socket: SocketIOClient.Socket;

  userMenu = [
    { title: 'Profile', icon: 'fa fa-user', link: '/pages/profile' },
    { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
    { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

    adminMenu = [    
      { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
      { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

      subAdminMenu = [    
        { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
        { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

 
  
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              protected api: ApiService,
              private router : Router,
              private changeDetectorRefs: ChangeDetectorRef) {
                this.userService.onUserChange()
                .subscribe((user: any) => this.user = user);
                this.api.receiveNotifications(this.user.id);
                
                this.socket = io(config.socketioUrl);
                this.socket.on('new_msg',servermsg => {
        
                  console.log(servermsg);
                  //update dataset here
                  this.refresh();
                })
  }

  ngOnInit() {
    this.userService.onUserChange()
    .subscribe((user: any) => this.user = user);
    if(this.user.role == 'student'){
        this.api.socketNotificationNo.subscribe(no =>{
          if(no==""){
            console.log("if(no==")
            //do nothing
          }else{
            console.log("")
            this.notification_no = no;
          }
        });
  
        this.api.socketmessage.subscribe(message =>{
          if(message==""){
            this.deleteShow = false;
            this.notification = message;
          }else{
            this.deleteShow = true;
            this.notification = message;
          }
        });
        //this.socket.emit('confirmation');
        //this.socket.emit('join', {email: this.user.email});
        // this.socket.on('person', function(person){  
        // });
    
        // this.socket.on('goodbye', function(){  
        //  console.log('goodbye goodbye goodbye goodbye goodbye');
        // });
       }
  }

  help(){
    this.router.navigate(['pages/help'])
  }

  notify(){
    console.log("notify");
    if(this.notification_no > 0){
      //console.log("this.notification_no > 0 ");
      this.api.makeReadNotification(this.user.id)
      .subscribe(
        (data: any) => {
          //console.log("Upadted data==========>");
          this.notification_no = '';
        },
        error => {
          console.error("Error", error);
        });
    }
  }

  deleteNotification(id){
   // console.log("id============>"+id);
    this.api.deleteNotification(this.user.id,id)
      .subscribe(
        (data: any) => {
         // console.log("Delete data==========>");
          this.ReloadNotification();
        },
        error => {
          console.error("Error", error);
        });
  }

  ReloadNotification(){
    this.notification=[];
    this.api.reloadnotification(this.user.id)
      .subscribe(
        (data: any) => {
          if(data['data'].length == 0){
            this.deleteShow = false;
            this.notification_no = '';
          }else if(data['data'].length > 0){
            this.deleteShow = true;
            if(data['notification_no'] == 0){
              this.notification_no = '';
            }else{
              this.notification_no = data['notification_no'];
            }
            for(let notify of data['data']) {
              this.notification.push(notify);
            }
          }
        },
        error => {
          console.error("Error", error);
        });
  }

  refresh(){
    this.notification=[];
    this.api.reloadnotification(this.user.id)
      .subscribe(
        (data: any) => {
          if(data['data'].length == 0){
            this.deleteShow = false;
            this.notification_no = '';
          }else if(data['data'].length > 0){
            this.deleteShow = true;
            if(data['notification_no'] == 0){
              this.notification_no = '';
            }else{
              this.notification_no = data['notification_no'];
            }
            for(let notify of data['data']) {
              this.notification.push(notify);
            }
          }
        },
        error => {
          console.error("Error", error);
        });
        this.changeDetectorRefs.detectChanges();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  toggleSettings(): boolean {

    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }
}