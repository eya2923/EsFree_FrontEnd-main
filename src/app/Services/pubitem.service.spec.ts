import { TestBed } from '@angular/core/testing';

import { PubitemService } from './pubitem.service';

describe('PubitemService', () => {
  let service: PubitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
