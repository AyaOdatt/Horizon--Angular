import { TestBed } from '@angular/core/testing';

import { ErrorHndelingInterceptor } from './error-hndeling.interceptor';

describe('ErrorHndelingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorHndelingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorHndelingInterceptor = TestBed.inject(ErrorHndelingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
