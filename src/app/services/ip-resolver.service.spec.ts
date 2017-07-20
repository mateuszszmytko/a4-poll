import { TestBed, inject } from '@angular/core/testing';

import { IpResolverService } from './ip-resolver.service';

describe('IpResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpResolverService]
    });
  });

  it('should be created', inject([IpResolverService], (service: IpResolverService) => {
    expect(service).toBeTruthy();
  }));
});
