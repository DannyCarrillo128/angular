import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {
    /* this.returnObservable().pipe(
      retry(1)
    ).subscribe({
      next: (value) => console.log('Subs:', value),
      error: (err) => console.error(err),
      complete: () => console.info('Complete') 
    }); */
    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(500).pipe(
                                map(value => { return value + 1; }),
                                filter(value => (value % 2 === 0) ? true : false),
                                take(10)
    );
  }

  returnObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          clearInterval(interval);
          observer.error('2!!!!');
        }

        i++;
      }, 1000);
    });
  }

}
