import { TestBed } from '@angular/core/testing';

import { GetpatentsService } from './getpatents.service';

describe('GetpatentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetpatentsService = TestBed.get(GetpatentsService);
    expect(service).toBeTruthy();
  });
});
