import { TestBed } from '@angular/core/testing';

import { CrosService } from './cros.service';

describe('CrosService', () => {
  let service: CrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
