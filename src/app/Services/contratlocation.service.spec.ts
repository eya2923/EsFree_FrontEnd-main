import { TestBed } from '@angular/core/testing';

import { ContratlocationService } from './contratlocation.service';

describe('ContratlocationService', () => {
  let service: ContratlocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratlocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
