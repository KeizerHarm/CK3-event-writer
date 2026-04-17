import { Component, inject } from '@angular/core';
import { Background, SettingsService } from '../../services/settings/settings.service';
import backgrounds from '../../../assets/backgrounds.json';


@Component({
  selector: 'app-background-selection',
  templateUrl: './background-selection.html',
  styleUrls: ['./background-selection.scss']
})
export class BackgroundSelection {
  private settingsService = inject(SettingsService);
  backgrounds: Background[] = backgrounds;

  constructor() {
  }

  selectBackground(id: number) {
    this.settingsService.setBackground(id);
  }
}
