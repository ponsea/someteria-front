import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CHROME_TABS } from './chrome-tabs-injection-token';
import { ChromeObservableFactory } from '../chrome-observable-factory.service';
import { ChromeTabs } from './chrome-tabs';
import { map } from 'rxjs/operators';
import Tab = chrome.tabs.Tab;
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import TabRemoveInfo = chrome.tabs.TabRemoveInfo;
import InjectDetails = chrome.tabs.InjectDetails;
import { CHROME_RUNTIME, ChromeRuntime } from '../runtime';
import QueryInfo = chrome.tabs.QueryInfo;

@Injectable({
  providedIn: 'root'
})
export class ChromeTabsService {
  onCreated$: Observable<Tab>;
  onUpdated$: Observable<{tabId: number, changeInfo: TabChangeInfo, tab: Tab}>;
  onRemoved$: Observable<{tabId: number, removeInfo: TabRemoveInfo}>;

  connect = this.underlying.connect;

  constructor(
    @Inject(CHROME_TABS) private underlying: ChromeTabs,
    @Inject(CHROME_RUNTIME) private runtime: ChromeRuntime,
    chromeObservableFactory: ChromeObservableFactory
  ) {
    this.onCreated$ = chromeObservableFactory.fromEvent(underlying.onCreated).pipe(
      map(([tab]) => tab)
    );
    this.onUpdated$ = chromeObservableFactory.fromEvent(underlying.onUpdated).pipe(
      map(([tabId, changeInfo, tab]) => ({tabId, changeInfo, tab}))
    );
    this.onRemoved$ = chromeObservableFactory.fromEvent(underlying.onRemoved).pipe(
      map(([tabId, removeInfo]) => ({tabId, removeInfo}))
    );
  }

  insertCSS(tabId: number, details: InjectDetails): Observable<void> {
    return new Observable(subscriber => {
      this.underlying.insertCSS(tabId, details, () => {
        if (this.runtime.lastError) {
          subscriber.error(this.runtime.lastError);
        } else {
          subscriber.next();
          subscriber.complete();
        }
      });
    });
  }

  executeScript(tabId: number, details: InjectDetails): Observable<any[]> {
    return new Observable(subscriber => {
      this.underlying.executeScript(tabId, details, result => {
        if (this.runtime.lastError) {
          subscriber.error(this.runtime.lastError);
        } else {
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }

  query(queryInfo: QueryInfo): Observable<Tab[]> {
    return new Observable(subscriber => {
      this.underlying.query(queryInfo, result => {
        if (this.runtime.lastError) {
          subscriber.error(this.runtime.lastError);
        } else {
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }

  get(tabId: number): Observable<Tab> {
    return new Observable(subscriber => {
      this.underlying.get(tabId, result => {
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
