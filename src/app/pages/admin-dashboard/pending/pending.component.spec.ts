import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { pendingComponent } from './pending.component';

describe('UnsignedComponent', () => {
  let component: pendingComponent;
  let fixture: ComponentFixture<pendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ pendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(pendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
