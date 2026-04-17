import { Injectable } from '@angular/core';
import backgrounds from '../../../assets/backgrounds.json';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class StateService {
  backgrounds: Background[] = backgrounds;
  currentEvent: BehaviorSubject<EventState>;

  currentBackground: BehaviorSubject<Background>;
  currentNoOfOptions: BehaviorSubject<number>;


  constructor() {
    this.currentBackground = new BehaviorSubject<Background>(backgrounds[0]);
    this.currentNoOfOptions = new BehaviorSubject<number>(2);
    this.currentEvent = new BehaviorSubject<EventState>({
      id: '',
      title: '',
      desc: '',
      options: [
        '','','','',''
      ]
    });
  }

  setBackground(id: number) {
    const newBg = backgrounds.filter(x => x.id === id)[0];
    this.currentBackground.next(newBg);
  }

  setNoOfOptions(amount: number) {
    this.currentNoOfOptions.next(amount);
  }
  
  updateEventState(state: Partial<EventState>) {
    const event = this.currentEvent.value;
    this.currentEvent.next(
      {
        ...event,
        ...state
      }
    )
  }

  clearAll() {
    this.currentBackground.next(backgrounds[0]);
    this.currentNoOfOptions.next(2);
    this.currentEvent.next({
      id: '',
      title: '',
      desc: '',
      options: [
        '','','','',''
      ]
    });
  }
}
