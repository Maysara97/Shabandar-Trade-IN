import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCompaniesAdsComponent } from './more-companies-ads.component';

describe('MoreCompaniesAdsComponent', () => {
  let component: MoreCompaniesAdsComponent;
  let fixture: ComponentFixture<MoreCompaniesAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreCompaniesAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreCompaniesAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
