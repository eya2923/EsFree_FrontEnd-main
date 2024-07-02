import { TestBed } from '@angular/core/testing';

import { Raba3Service } from './raba3.service';

describe('Raba3Service', () => {
  let service: Raba3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Raba3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
