import { Observable } from 'rxjs/Observable';
import { takeOnly, switchCase, symbolInterval } from './operators';
import { SkipSubject } from './skipSubject';

const source$: Observable<string> = symbolInterval(500);
const vowels = 'aeiouy';

source$
  .pipe(
    takeOnly(vowels),
    switchCase
  ).subscribe(data => console.log(`Symbols: ${data}`));

const sub = new SkipSubject<number>(2);
sub.subscribe(v => console.log('Sub1', v));
sub.next(1);
sub.next(2);
sub.next(3); // Sub1 3
sub.next(4); // Sub1 4
sub.subscribe(v => console.log('Sub2', v));
sub.next(5); // Sub1 5
sub.next(6); // Sub1 6
sub.next(7); // Sub1 7, Sub2 7
sub.next(8); // Sub1 8, Sub2 8
