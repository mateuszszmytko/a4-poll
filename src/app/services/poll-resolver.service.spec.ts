import { TestBed, inject } from '@angular/core/testing';

import { PollResolverService } from './poll-resolver.service';

describe('PollResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollResolverService]
    });
  });

  it('should be created', inject([PollResolverService], (service: PollResolverService) => {
    expect(service).toBeTruthy();
  }));
});
