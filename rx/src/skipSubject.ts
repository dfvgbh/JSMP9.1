import { Observer, PartialObserver } from 'rxjs/Observer';
import { ObjectUnsubscribedError } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

export class SkipSubject<T> extends Subject<T> {
  private observersTimes: WeakMap<Observer<T>, number> = new WeakMap();

  constructor(private skipTimes: number) {
    super();
  }

  next(value: T): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    if (!this.isStopped) {
      const { observers } = this;
      observers.forEach(o => {
        const times = this.observersTimes.get(o);
        this.observersTimes.set(o, times + 1);
        times >= this.skipTimes && o.next(value);
      });
    }
  }

  subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    let subscriber: Subscriber<T>;

    if (observerOrNext && observerOrNext instanceof Subscriber) {
      subscriber = observerOrNext;
    } else {
      subscriber = new Subscriber(observerOrNext, error, complete);
    }

    this.observersTimes.set(subscriber, 0);
    return super.subscribe(subscriber);
  }
}
