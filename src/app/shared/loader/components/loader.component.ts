import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderService } from '../services';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() show = false;
  @Input() text = '';

  constructor(private loaderService: LoaderService) {

  }

  cancel() {
    this.loaderService.hideSpinner();
  }
}
