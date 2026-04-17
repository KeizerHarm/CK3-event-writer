import { Injectable } from '@angular/core';
import backgrounds from '../../../assets/backgrounds.json';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Background {
  id: number;
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  backgrounds: Background[] = backgrounds;

  currentBackground: BehaviorSubject<Background>;
  currentNoOfOptions: BehaviorSubject<number>;

  constructor() {
    this.currentBackground = new BehaviorSubject<Background>(backgrounds.filter(x => x.id === 1)[0]);
    this.currentNoOfOptions = new BehaviorSubject<number>(2);
  }

  setBackground(id: number) {
    const newBg = backgrounds.filter(x => x.id === id)[0];
    this.currentBackground.next(newBg);
  }

  setNoOfOptions(amount: number) {
    this.currentNoOfOptions.next(amount);
  }
}
