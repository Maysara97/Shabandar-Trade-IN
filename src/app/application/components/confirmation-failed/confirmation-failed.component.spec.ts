import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationFailedComponent } from './confirmation-failed.component';

describe('ConfirmationFailedComponent', () => {
  let component: ConfirmationFailedComponent;
  let fixture: ComponentFixture<ConfirmationFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
