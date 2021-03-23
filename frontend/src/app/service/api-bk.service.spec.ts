import { TestBed } from '@angular/core/testing';

import { ApiBKService } from './api-bk.service';

describe('ApiBKService', () => {
  let service: ApiBKService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBKService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
