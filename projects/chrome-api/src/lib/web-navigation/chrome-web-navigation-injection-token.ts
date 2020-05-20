import { inject, InjectionToken } from '@angular/core';
import { CHROME } from '../chrome-injection-token';
import { ChromeWebNavigation } from './chrome-web-navigation';

export const CHROME_WEB_NAVIGATION = new InjectionToken<ChromeWebNavigation>(
  'Chrome Web Navigation API',
  {
    providedIn: 'root',
    factory: () => inject(CHROME).webNavigation
  }
);
