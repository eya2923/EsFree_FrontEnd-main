import { TestBed } from '@angular/core/testing';

import { BadWordServiceService } from './bad-word-service.service';

describe('BadWordServiceService', () => {
  let service: BadWordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadWordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
