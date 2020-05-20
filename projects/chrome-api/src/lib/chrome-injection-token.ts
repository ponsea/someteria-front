import { InjectionToken } from '@angular/core';
import { Chrome } from './chrome';

export const CHROME = new InjectionToken<Chrome>(
  'Chrome APIs',
  {
    providedIn: 'root',
    factory: () => chrome
  }
);
