import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-options-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './options-panel.html',
  styleUrl: './options-panel.scss',
})
export class OptionsPanel implements OnInit {
  private settingsService = inject(SettingsService);
  constructor() {
  }
  
  currentNoOfOptions = this.settingsService.currentNoOfOptions;
  control = new FormControl<number>(this.currentNoOfOptions.value);


  ngOnInit() {
    this.currentNoOfOptions.subscribe(value => {
      this.control.setValue(value, { emitEvent: false });
    });

    this.control.valueChanges.subscribe(value => {
      if (value !== null) {
        this.selectNoOfOptions(value);
      }
    });
  }

  selectNoOfOptions(amount: number) {
    this.settingsService.setNoOfOptions(amount);
  }
}
