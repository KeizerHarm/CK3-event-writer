import { Component, signal } from '@angular/core';
import { Writer } from './components/writer/writer';
import { BackgroundSelection } from './components/background-selection/background-selection';
import { OptionsPanel } from './components/options-panel/options-panel';
import { ExportPanel } from "./components/export-panel/export-panel";

@Component({
  selector: 'app-root',
  imports: [Writer, BackgroundSelection, OptionsPanel, ExportPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('eventwriter');
}
