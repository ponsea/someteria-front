import { inject, InjectionToken } from '@angular/core';
import { CHROME } from '../chrome-injection-token';
import { ChromeTabs } from './chrome-tabs';

export const CHROME_TABS = new InjectionToken<ChromeTabs>(
  'Chrome Tabs API',
  {
    providedIn: 'root',
    factory: () => inject(CHROME).tabs
  }
);
