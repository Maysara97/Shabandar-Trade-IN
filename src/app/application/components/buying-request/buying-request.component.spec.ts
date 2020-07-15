import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingRequestComponent } from './buying-request.component';

describe('BuyingRequestComponent', () => {
  let component: BuyingRequestComponent;
  let fixture: ComponentFixture<BuyingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
