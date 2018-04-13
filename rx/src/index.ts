import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { takeEveryNth, fromLol } from './operators';

const source$: Observable<string> = fromLol();
source$
  .pipe(
    map(value => value + '!!!')
  ).subscribe(data => console.log(data));
