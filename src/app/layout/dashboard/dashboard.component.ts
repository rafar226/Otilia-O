import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToComponent(url: string) {
    this.router.navigate(['/', url]);
  }
}
