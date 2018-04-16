import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { async } from 'rxjs/scheduler/async';
import { Action } from 'rxjs/scheduler/Action';

export const takeOnly = (s: string) => (source: Observable<String>) =>
  new Observable<String>(observer => {
    return source.subscribe({
      next(x) {
        s.toUpperCase().includes(x.toUpperCase()) && observer.next(x);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
  });

export const switchCase = (source: Observable<String>) =>
  new Observable<String>(observer => {
    return source.subscribe({
      next(x) {
        const lastUpperAscii = 90;
        const isUpper = x.charCodeAt(0) <= lastUpperAscii;
        observer.next(isUpper ? x.toLowerCase() : x.toUpperCase());
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
  });

export function symbolInterval(period: number, scheduler = async): Observable<string> {
  return new Observable<string>(subscriber => {
    subscriber.add(
      scheduler.schedule(dispatch, period, { subscriber, symbol: getRandomSymbol(), period })
    );
    return subscriber;
  });
}

/** Utils */

function dispatch(this: Action<IntervalState>, state: IntervalState) {
  const { subscriber, symbol, period } = state;
  subscriber.next(symbol);
  this.schedule({ subscriber, symbol: getRandomSymbol(), period }, period);
}

interface IntervalState {
  subscriber: Subscriber<string>;
  symbol: string;
  period: number;
}

function getRandomSymbol(): string {
  const firstAsciiCharCode = 97;
  const charsCount = 26;
  const toUpperCaseDif = -32;
  const isToUpper = Math.floor(Math.random() * 2);
  const charCode = Math.floor((Math.random() * charsCount)) + firstAsciiCharCode + isToUpper * toUpperCaseDif;

  return String.fromCharCode(charCode);
}

// http://www.introtorx.com/Content/v1.0.10621.0/15_SchedulingAndThreading.html
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts
// https://www.pertiller.tech/blog/on-the-subject-of-multiple-subscriptions-with-rxjs