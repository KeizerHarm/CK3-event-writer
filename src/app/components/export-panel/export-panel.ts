import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-export-panel',
  imports: [],
  templateUrl: './export-panel.html',
  styleUrl: './export-panel.scss',
})
export class ExportPanel {
  private settingsService = inject(SettingsService);

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
    return 'test';
  }

  private readonly eventIdRegex = new RegExp('[a-zA-Z0-9_]*\\.[0-9]{1,4}$');
  validateEventId() {
    const eventId = this.settingsService.eventId;
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
