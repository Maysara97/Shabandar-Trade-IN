import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuyingRequestComponent } from './edit-buying-request.component';

describe('EditBuyingRequestComponent', () => {
  let component: EditBuyingRequestComponent;
  let fixture: ComponentFixture<EditBuyingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBuyingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuyingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
