import { TestBed, inject } from '@angular/core/testing';

import { RugserviceService } from './rugservice.service';

describe('RugserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RugserviceService]
    });
  });

  it('should be created', inject([RugserviceService], (service: RugserviceService) => {
    expect(service).toBeTruthy();
  }));
});
