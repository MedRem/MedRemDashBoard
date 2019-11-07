import { TestBed } from '@angular/core/testing';

import { RammmadService } from './rammmad.service';

describe('RammmadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RammmadService = TestBed.get(RammmadService);
    expect(service).toBeTruthy();
  });
});
