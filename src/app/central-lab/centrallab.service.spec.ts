import { TestBed } from '@angular/core/testing';

import { CentrallabService } from './centrallab.service';

describe('CentrallabService', () => {
  let service: CentrallabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrallabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
