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

export enum Tab {
  Writer,
  Characters
}

interface PersistentState {
  event: EventState;
  background: Background;
  noOfOptions: number;
}
interface VolatileState {
  tab: Tab;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  allAvailableBackgrounds: Background[] = backgrounds;

  private persistentState$: BehaviorSubject<PersistentState>;
  private volatileState$: BehaviorSubject<VolatileState>;

  constructor() {
    this.persistentState$ = new BehaviorSubject<PersistentState>({
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

    this.background$ = this.persistentState$.pipe(
      map(state => state.background),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.noOfOptions$ = this.persistentState$.pipe(
      map(state => state.noOfOptions),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.event$ = this.persistentState$.pipe(
      map(state => state.event),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );


    const cache = localStorage.getItem('cache');
    if (cache) {
      this.persistentState$.next(JSON.parse(cache));
    }

    this.persistentState$.subscribe(value => {
      localStorage.setItem('cache', JSON.stringify(value));
    });

    this.volatileState$ = new BehaviorSubject<VolatileState>({
      tab: Tab.Writer
    });
    this.tab$ = this.volatileState$.pipe(
      map(state => state.tab),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  event$: Observable<EventState>;
  getCurrentEvent(): EventState {
    return this.persistentState$.value.event;
  }
  updateEventState(state: Partial<EventState>) {
    const currentEvent = this.getCurrentEvent();
    this.persistentState$.next(
      { ...this.persistentState$.value,
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
    return this.persistentState$.value.background;
  }
  setBackground(id: number) {
    const newBg = backgrounds.filter(x => x.id === id)[0];
    this.persistentState$.next( { ...this.persistentState$.value, background: newBg } );
  }

  noOfOptions$: Observable<number>;
  getCurrentNoOfOptions(): number {
    return this.persistentState$.value.noOfOptions;
  }
  setNoOfOptions(amount: number) {
    this.persistentState$.next( { ...this.persistentState$.value, noOfOptions: amount } );
  }

  tab$: Observable<Tab>;
  getCurrentTab(): Tab {
    return this.volatileState$.value.tab;
  }
  setTab(tab: Tab) {
    this.volatileState$.next( { ...this.volatileState$.value, tab } );
  }

  clearAll() {
    this.persistentState$.next({
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
