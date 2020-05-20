import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Event = chrome.events.Event;

@Injectable({
  providedIn: 'root'
})
export class ChromeObservableFactory {
  fromEvent<T extends (...args: any) => any>(event: Event<T>): Observable<Parameters<T>> {
    return new Observable(subscriber => {
      const callback = ((...args: Parameters<T>) => subscriber.next(args)) as T;
      event.addListener(callback);
      return () => event.removeListener(callback);
    });
  }
}
