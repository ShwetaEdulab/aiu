import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminDashboardComponent } from './sub-admin-dashboard.component';

describe('SubAdminDashboardComponent', () => {
  let component: SubAdminDashboardComponent;
  let fixture: ComponentFixture<SubAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
