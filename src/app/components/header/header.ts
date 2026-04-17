import { Component, inject } from '@angular/core';
import { StateService, Tab } from '../../services/state/state.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private stateService = inject(StateService);
  tab$: Observable<Tab> = this.stateService.tab$;
  Tab = Tab;

  clear() {
    this.stateService.clearAll();
  }

  setTab(tab: Tab) {
    this.stateService.setTab(tab);
  }
}
