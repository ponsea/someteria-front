import { inject, InjectionToken } from '@angular/core';
import { CHROME } from '../chrome-injection-token';
import { ChromeRuntime } from './chrome-runtime';

export const CHROME_RUNTIME = new InjectionToken<ChromeRuntime>(
  'Chrome Runtime API',
  {
    providedIn: 'root',
    factory: () => inject(CHROME).runtime
  }
);
