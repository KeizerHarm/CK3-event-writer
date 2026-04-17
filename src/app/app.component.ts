import { Component, inject, signal } from '@angular/core';
import { Writer } from './components/writer/writer';
import { BackgroundSelection } from './components/background-selection/background-selection';
import { OptionsPanel } from './components/options-panel/options-panel';
import { ExportPanel } from "./components/export-panel/export-panel";
import { Header } from "./components/header/header";
import { CharacterStorage } from "./components/character-storage/character-storage";
import { StateService, Tab } from './services/state/state.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Writer, BackgroundSelection, OptionsPanel, ExportPanel, Header, CharacterStorage, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('eventwriter');

  stateService = inject(StateService);

  tabCharactersDisplay: Observable<string>;
  tabWriterDisplay: Observable<string>;

  constructor (){
    this.tabCharactersDisplay = this.stateService.tab$.pipe(
      map(tab => {
        if (tab === Tab.Characters) {
          return 'block';
        }
        return 'none';
      })
    )
    this.tabWriterDisplay = this.stateService.tab$.pipe(
      map(tab => {
        if (tab === Tab.Writer) {
          return 'block';
        }
        return 'none';
      })
    )
  }
}
