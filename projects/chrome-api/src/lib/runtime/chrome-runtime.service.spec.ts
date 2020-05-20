import { TestBed } from '@angular/core/testing';

import { ChromeRuntimeService } from './chrome-runtime.service';

describe('ChromeRuntimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChromeRuntimeService = TestBed.get(ChromeRuntimeService);
    expect(service).toBeTruthy();
  });
});
