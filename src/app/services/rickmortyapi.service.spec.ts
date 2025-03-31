import { TestBed } from '@angular/core/testing';

import { RickmortyapiService } from './rickmortyapi.service';

describe('RickmortyapiService', () => {
  let service: RickmortyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickmortyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
