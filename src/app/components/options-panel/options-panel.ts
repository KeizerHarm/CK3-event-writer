import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../services/state/state.service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-options-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './options-panel.html',
  styleUrl: './options-panel.scss',
})
export class OptionsPanel implements OnInit {
  private stateService = inject(StateService);
  noOfOptionsControl = new FormControl<number>(this.stateService.getCurrentNoOfOptions());
  eventIdControl = new FormControl<string>('');

  ngOnInit() {
    this.stateService.noOfOptions$.subscribe(value => {
      this.noOfOptionsControl.setValue(value, { emitEvent: false });
    });

    this.noOfOptionsControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.stateService.setNoOfOptions(value);
      }
    });
    
    this.stateService.event$.subscribe(value => {
      this.eventIdControl.setValue(value.id, { emitEvent: false });
    });

    this.eventIdControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.stateService.updateEventState({ id: value });
      }
    })
  }
}
