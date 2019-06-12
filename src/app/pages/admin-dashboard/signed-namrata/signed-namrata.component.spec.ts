import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedNamrataComponent } from './signed-namrata.component';

describe('SignedNamrataComponent', () => {
  let component: SignedNamrataComponent;
  let fixture: ComponentFixture<SignedNamrataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedNamrataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedNamrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
