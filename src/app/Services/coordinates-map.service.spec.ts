import { TestBed } from '@angular/core/testing';

import { CoordinatesMapService } from './coordinates-map.service';

describe('CoordinatesMapService', () => {
  let service: CoordinatesMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinatesMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
