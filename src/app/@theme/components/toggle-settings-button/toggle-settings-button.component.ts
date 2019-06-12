import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { StateService } from '../../../@core/utils';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-toggle-settings-button',
  styleUrls: ['./toggle-settings-button.component.scss'],
  template: `
    <button class="toggle-settings"
            *ngIf="user?.role == 'student'"
            (click)="toggleSettings()"
            [class.expanded]="expanded"
            [class.sidebar-end]="sidebarEnd"
            [class.was-expanded]="wasExpanded"
    >
      <i class="ion-ios-cart"></i>
    </button>
  `,
})
export class ToggleSettingsButtonComponent {

  sidebarEnd = false;
  expanded = false;
  wasExpanded = false;
  user: any;

  constructor(private sidebarService: NbSidebarService,
     protected stateService: StateService,
     private userService: UserService) {
    this.stateService.onSidebarState()
      .subscribe(({id}) => {
        this.sidebarEnd = id === 'end';
      });
  }

  ngOnInit() {
    this.userService.onUserChange()
    .subscribe((user: any) => this.user = user);
    //check comment
  }

  toggleSettings() {
    this.sidebarService.toggle(false, 'settings-sidebar');
    this.expanded = !this.expanded;
    this.wasExpanded = true;
  }
}
