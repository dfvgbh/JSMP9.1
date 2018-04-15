import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { async } from 'rxjs/scheduler/async';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ObjectUnsubscribedError } from 'rxjs/Rx';
import { PartialObserver } from 'rxjs/Observer';

export const takeOnly = (s: string) => (source: Observable<String>) =>
  new Observable<String>(observer => {
    return source.subscribe({
      next(x) {
        if (s.toUpperCase().includes(x.toUpperCase())) observer.next(x);
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
  });

export const toLoPerCase = (source: Observable<String>) =>
  new Observable<String>(observer => {
    return source.subscribe({
      next(x) {
        const isUpper = x.charCodeAt(0) <= 90;
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
  if (!scheduler || typeof scheduler.schedule !== 'function') {
    scheduler = async;
  }

  return new Observable<string>(subscriber => {
    subscriber.add(
      scheduler.schedule(dispatch, period, { subscriber, counter: getRandomSymbol(), period })
    );
    return subscriber;
  });
}

interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

function dispatch(this: SchedulerAction<IntervalState>, state: IntervalState) {
  const { subscriber, counter, period } = state;
  subscriber.next(counter);
  this.schedule({ subscriber, counter: getRandomSymbol(), period }, period);
}

function getRandomSymbol(): string {
  const firstCharCode = 97;
  const charsCount = 26;
  const toUpperCaseDif = -32;
  const isToUpper = Math.floor(Math.random() * 2);
  const charCode = Math.floor((Math.random() * charsCount)) + firstCharCode + isToUpper * toUpperCaseDif;

  return String.fromCharCode(charCode);
}

interface IntervalState {
  subscriber: Subscriber<string>;
  counter: string;
  period: number;
}

export class MiracleSubject<T> extends Subject<T> {
  private times = 0;
  private observersTimes: WeakMap<Subscriber<T>, number> = new WeakMap();

  constructor(private skipTimes: number) {
    super();
  }

  next(value: T): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    if (this.skipTimes > this.times++) return;
    if (!this.isStopped) {
      const { observers } = this;
      observers.forEach(o => o.next(value));
    }
  }

  // subscribe(observer?: PartialObserver<T>) {
  //   super.subscribe(observer);
  // };
  // subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
  //   super.subscribe(next, error, complete);
  // }

  subscribe(): void {

  }
}

// http://www.introtorx.com/Content/v1.0.10621.0/15_SchedulingAndThreading.html
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts
// https://www.pertiller.tech/blog/on-the-subject-of-multiple-subscriptions-with-rxjs