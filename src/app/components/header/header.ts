import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private stateService = inject(StateService);

  clear() {
    this.stateService.clearAll();
  }
}
