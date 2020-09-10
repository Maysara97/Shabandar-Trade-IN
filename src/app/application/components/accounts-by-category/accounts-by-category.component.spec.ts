import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsByCategoryComponent } from './accounts-by-category.component';

describe('AccountsByCategoryComponent', () => {
  let component: AccountsByCategoryComponent;
  let fixture: ComponentFixture<AccountsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
