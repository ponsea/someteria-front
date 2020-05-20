import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CHROME_WEB_NAVIGATION } from './chrome-web-navigation-injection-token';
import { ChromeWebNavigation } from './chrome-web-navigation';
import GetAllFrameDetails = chrome.webNavigation.GetAllFrameDetails;
import GetAllFrameResultDetails = chrome.webNavigation.GetAllFrameResultDetails;
import { CHROME_RUNTIME, ChromeRuntime } from '../runtime';

@Injectable({
  providedIn: 'root'
})
export class ChromeWebNavigationService {
  constructor(
    @Inject(CHROME_WEB_NAVIGATION) private underlying: ChromeWebNavigation,
    @Inject(CHROME_RUNTIME) private runtime: ChromeRuntime,
  ) { }

  getAllFrames(details: GetAllFrameDetails): Observable<GetAllFrameResultDetails[] | null> {
    return new Observable(subscriber => {
      this.underlying.getAllFrames(details, result => {
        if (this.runtime.lastError) {
          subscriber.error(this.runtime.lastError);
        } else {
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }
}
