import { TestBed } from '@angular/core/testing';

import { RecordpatentService } from './recordpatent.service';

describe('RecordpatentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordpatentService = TestBed.get(RecordpatentService);
    expect(service).toBeTruthy();
  });
});
