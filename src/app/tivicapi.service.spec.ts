import { TestBed } from '@angular/core/testing';

import { TivicapiService } from './tivicapi.service';

describe('TivicapiService', () => {
  let service: TivicapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TivicapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
