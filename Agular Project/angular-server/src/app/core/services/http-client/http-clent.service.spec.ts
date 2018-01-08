import { TestBed, inject } from '@angular/core/testing';

import { HttpClentService } from './http-clent.service';

describe('HttpClentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClentService]
    });
  });

  it('should be created', inject([HttpClentService], (service: HttpClentService) => {
    expect(service).toBeTruthy();
  }));
});
