import { Component, inject } from '@angular/core';
import { TextareaAutoresizeDirective } from '../../directives/textarea-autoresize';
import { StateService } from '../../services/state/state.service';
import { AsyncPipe } from '@angular/common'; 
import { BehaviorSubject } from 'rxjs';

type OptionState = {
  id: number;
  height: number;
  visible: boolean;
}
type OptionsState = OptionState[];

@Component({
  selector: 'app-writer',
  templateUrl: './writer.html',
  styleUrls: [ './writer.scss' ],
  imports: [ TextareaAutoresizeDirective, AsyncPipe ]
})
export class Writer {
  stateService = inject(StateService);
  currentBackground = this.stateService.background$;
  currentNoOfOptions = this.stateService.noOfOptions$;
  currentEvent = this.stateService.event$;
  maskPath: BehaviorSubject<string>;
  descHeight: BehaviorSubject<number>;
  optionsState: BehaviorSubject<OptionsState>;

  constructor (){
    this.maskPath = new BehaviorSubject<string>("");
    this.descHeight = new BehaviorSubject<number>(430);

    this.optionsState = new BehaviorSubject<OptionsState>(
      [
        {
          id: 1,
          visible: true,
          height: 530
        },
        {
          id: 2,
          visible: false,
          height: 0
        },
        {
          id: 3,
          visible: false,
          height: 0
        },
        {
          id: 4,
          visible: false,
          height: 0
        },
        {
          id: 5,
          visible: false,
          height: 0
        }
      ]
    );
    this.currentNoOfOptions.subscribe(x => {
      this.maskPath.next('./assets/eventmask_' + x + '.png');
      this.updateOptionsState(x);
      this.descHeight.next(430 - (42 * (x - 1)));
    });
  }

  onTitleInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.stateService.updateEventState({ title: input });
  }

  onDescInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.stateService.updateEventState({ desc: input });
  }

  onOptionInput(event: Event, id: number) {
    const input = (event.target as HTMLInputElement).value;
    const currentOptions = this.stateService.getCurrentEvent().options;
    currentOptions[id-1] = input;
    this.stateService.updateEventState({ options: currentOptions });
  }

  updateOptionsState(amount: number): void {
    const currentState = this.optionsState.value;
    for (let i = 0; i < 5; i++) {
      const option = currentState[i];
      option.visible = (amount <= i);
      const offset = 0 - ((i - amount + 1) * 42);
      option.height = 530 - offset;
    }
    this.optionsState.next(currentState);
  }

  lipsumLong = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nIaculis massa nisl malesuada lacinia integer nunc posuere.';
  lipsumShort = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}
