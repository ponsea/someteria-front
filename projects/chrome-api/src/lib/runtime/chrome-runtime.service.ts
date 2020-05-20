import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CHROME_RUNTIME } from './chrome-runtime-injection-token';
import { ChromeObservableFactory } from '../chrome-observable-factory.service';
import { ChromeRuntime } from './chrome-runtime';
import { map } from 'rxjs/operators';
import MessageSender = chrome.runtime.MessageSender;

@Injectable({
  providedIn: 'root'
})
export class ChromeRuntimeService {
  onMessage$: Observable<{message: any, sender: MessageSender, sendResponse: (response?: any) => void}>;

  constructor(
    @Inject(CHROME_RUNTIME) private underlying: ChromeRuntime,
    chromeObservableFactory: ChromeObservableFactory
  ) {
    this.onMessage$ = chromeObservableFactory.fromEvent(underlying.onMessage).pipe(
      map(([message, sender, sendResponse]) => ({message, sender, sendResponse}))
    );
  }

  sendMessage = this.underlying.sendMessage;
}
