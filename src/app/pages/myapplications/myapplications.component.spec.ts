import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapplicationsComponent } from './myapplications.component';

describe('MyapplicationsComponent', () => {
  let component: MyapplicationsComponent;
  let fixture: ComponentFixture<MyapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
