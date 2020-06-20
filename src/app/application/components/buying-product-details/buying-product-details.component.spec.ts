import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingProductDetailsComponent } from './buying-product-details.component';

describe('BuyingProductDetailsComponent', () => {
  let component: BuyingProductDetailsComponent;
  let fixture: ComponentFixture<BuyingProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
