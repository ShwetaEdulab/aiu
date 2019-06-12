import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NotificationDropdownComponent implements OnInit {
  notifications=[];
  constructor(config: NgbDropdownConfig) { 
    config.autoClose = false;
  }

  ngOnInit() {
  }

}
