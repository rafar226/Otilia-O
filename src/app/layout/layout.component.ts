import { Component } from '@angular/core';

@Component({
  selector: 'inv-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  collapedSideBar = false;

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }
}
