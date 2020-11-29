import { TestBed } from '@angular/core/testing';

import { GeneralSearchingService } from './general-searching.service';

describe('GeneralSearchingService', () => {
  let service: GeneralSearchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralSearchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
