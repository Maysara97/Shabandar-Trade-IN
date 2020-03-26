import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReadMoreComponent } from './home-read-more.component';

describe('HomeReadMoreComponent', () => {
  let component: HomeReadMoreComponent;
  let fixture: ComponentFixture<HomeReadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
