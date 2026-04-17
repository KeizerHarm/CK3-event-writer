import { Injectable, OnInit } from '@angular/core';
import backgrounds from '../../../assets/backgrounds.json';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';

export interface Background {
  id: number;
  name: string;
  path: string;
}

export interface EventState {
  id: string;
  title: string;
  desc: string;

  options: string[];
}

interface State {
  event: EventState;
  background: Background;
  noOfOptions: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  allAvailableBackgrounds: Background[] = backgrounds;

  private state$: BehaviorSubject<State>;

  constructor() {
    this.state$ = new BehaviorSubject<State>({
      event: {
        id: '',
        title: '',
        desc: '',
        options: [
          '','','','',''
        ]
      },
      noOfOptions: 2,
      background: backgrounds[0]
    });

    this.background$ = this.state$.pipe(
      map(state => state.background),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.noOfOptions$ = this.state$.pipe(
      map(state => state.noOfOptions),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.event$ = this.state$.pipe(
      map(state => state.event),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );


    const cache = localStorage.getItem('cache');
    if (cache) {
      this.state$.next(JSON.parse(cache));
    }

    this.state$.subscribe(value => {
      localStorage.setItem('cache', JSON.stringify(value));
    });
  }

  event$: Observable<EventState>;
  getCurrentEvent(): EventState {
    return this.state$.value.event;
  }
  updateEventState(state: Partial<EventState>) {
    const currentEvent = this.getCurrentEvent();
    this.state$.next(
      { ...this.state$.value,
         event: 
        {
          ...currentEvent,
          ...state
        }
      }
    );
  }

  background$: Observable<Background>;
  getCurrentBackground(): Background {
    return this.state$.value.background;
  }
  setBackground(id: number) {
    const newBg = backgrounds.filter(x => x.id === id)[0];
    this.state$.next( { ...this.state$.value, background: newBg } );
  }

  noOfOptions$: Observable<number>;
  getCurrentNoOfOptions(): number {
    return this.state$.value.noOfOptions;
  }
  setNoOfOptions(amount: number) {
    this.state$.next( { ...this.state$.value, noOfOptions: amount } );
  }

  clearAll() {
    this.state$.next({
      background: backgrounds[0],
      noOfOptions: 2,
      event: {
        id: '',
        title: '',
        desc: '',
        options: [
          '','','','',''
        ]
      }
    });
  }
}
