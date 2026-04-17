import { Component, inject } from '@angular/core';
import { Background, StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-background-selection',
  templateUrl: './background-selection.html',
  styleUrls: ['./background-selection.scss']
})
export class BackgroundSelection {
  private stateService = inject(StateService);
  backgrounds: Background[] = this.stateService.allAvailableBackgrounds;

  constructor() {
  }

  selectBackground(id: number) {
    this.stateService.setBackground(id);
  }
}
