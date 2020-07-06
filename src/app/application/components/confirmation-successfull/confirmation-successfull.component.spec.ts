import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSuccessfullComponent } from './confirmation-successfull.component';

describe('ConfirmationSuccessfullComponent', () => {
  let component: ConfirmationSuccessfullComponent;
  let fixture: ComponentFixture<ConfirmationSuccessfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationSuccessfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
