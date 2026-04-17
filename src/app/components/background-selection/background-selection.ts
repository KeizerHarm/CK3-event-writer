import { Component, inject } from '@angular/core';
import { Background, StateService } from '../../services/state/state.service';
import backgrounds from '../../../assets/backgrounds.json';


@Component({
  selector: 'app-background-selection',
  templateUrl: './background-selection.html',
  styleUrls: ['./background-selection.scss']
})
export class BackgroundSelection {
  private stateService = inject(StateService);
  backgrounds: Background[] = backgrounds;

  constructor() {
  }

  selectBackground(id: number) {
    this.stateService.setBackground(id);
  }
}
