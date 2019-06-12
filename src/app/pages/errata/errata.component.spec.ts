import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrataComponent } from './errata.component';

describe('ErrataComponent', () => {
  let component: ErrataComponent;
  let fixture: ComponentFixture<ErrataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
