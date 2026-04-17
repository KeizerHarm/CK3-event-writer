import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-export-panel',
  imports: [],
  templateUrl: './export-panel.html',
  styleUrl: './export-panel.scss',
})
export class ExportPanel {
  private stateService = inject(StateService);

  errorMessages: string[] = [];
  warningMessages: string[] = [];

  state: 'pending' | 'success' | 'failure' = 'pending';
  exported: string = '';

  export() {
    this.state = 'pending';
    this.errorMessages = [];
    this.warningMessages = [];
    this.validateEventId();

    if (this.errorMessages.length > 0) {
      this.state = 'failure';
      return;
    }

    this.state = 'success';
    this.exported = this.buildExport();
  }

  buildExport(): string {
    const event = this.stateService.getCurrentEvent();
    const titleStr = ` ${event.id}.t : "${event.title}"\n`;
    let descStr = event.desc.replace(/\r?\n/g, "\\n");
    descStr = ` ${event.id}.desc : "${descStr}"\n`;

    const opt1Str = ` ${event.id}.a: "${event.options[0]}"\n`;

    let exported = titleStr + descStr + opt1Str;
    if (event.options[1]) {
      exported += ` ${event.id}.b: "${event.options[1]}"\n`;
    }
    if (event.options[2]) {
      exported += ` ${event.id}.c: "${event.options[2]}"\n`;
    }
    if (event.options[3]) {
      exported += ` ${event.id}.d: "${event.options[3]}"\n`;
    }
    if (event.options[4]) {
      exported += ` ${event.id}.e: "${event.options[4]}"\n`;
    }
    return exported;
  }

  private readonly eventIdRegex = new RegExp('[a-zA-Z0-9_]*\\.[0-9]{1,4}$');
  validateEventId() {
    const eventId = this.stateService.getCurrentEvent().id;
    if (eventId === null || eventId === '') {
      this.errorMessages.push('Event id missing!');
      return;
    }
    console.log(this.eventIdRegex);

    if (!this.eventIdRegex.test(eventId)) {
      this.errorMessages.push('Event id ' + eventId + ' is not valid! The required format is alphanumeric string, a dot, and a number of up to four digits.');
    }
  }
}
