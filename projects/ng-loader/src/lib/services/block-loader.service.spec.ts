import { TestBed } from '@angular/core/testing';

import { BlockLoaderService } from './block-loader.service';

describe('BlockLoaderService', () => {
  let service: BlockLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
