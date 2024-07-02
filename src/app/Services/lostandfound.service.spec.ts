import { TestBed } from '@angular/core/testing';

import { LostandfoundService } from './lostandfound.service';

describe('LostandfoundService', () => {
  let service: LostandfoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostandfoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
