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
  noOfOptionsControl = new FormControl<number>(this.currentNoOfOptions.value);
  eventIdControl = new FormControl<string>('');

  ngOnInit() {
    this.currentNoOfOptions.subscribe(value => {
      this.noOfOptionsControl.setValue(value, { emitEvent: false });
    });

    this.noOfOptionsControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.settingsService.setNoOfOptions(value);
      }
    });

    this.eventIdControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.settingsService.setEventId(value);
      }
    })
  }
}
