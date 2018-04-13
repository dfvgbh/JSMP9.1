import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

export const takeEveryNth = (n: number) => <T>(source: Observable<T>) =>
  new Observable<T>(observer => {
    let count = 0;
    return source.subscribe({
      next(x) {
        if (count++ % n === 0) observer.next(x);
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    })
  });

export function fromLol() {
  return new Observable<string>(
    (subscriber: Subscriber<string>) => {
      setInterval(() => subscriber.next('S'), 1000);
      subscriber.next('S');
      if (!subscriber.closed) {
        subscriber.complete();
      }
    }
  );
}

// http://www.introtorx.com/Content/v1.0.10621.0/15_SchedulingAndThreading.html
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/interval.ts