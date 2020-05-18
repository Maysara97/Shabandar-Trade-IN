import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRequestFormComponent } from './add-new-request-form.component';

describe('AddNewRequestFormComponent', () => {
  let component: AddNewRequestFormComponent;
  let fixture: ComponentFixture<AddNewRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
