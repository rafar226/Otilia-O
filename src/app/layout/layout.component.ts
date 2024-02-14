import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  collapedSideBar = false;
  loader = false;
  text = '';

  private destroy = new Subject<boolean>();

  constructor(private loaderService: LoaderService) {
    this.loaderService.loaderResponse$.pipe(takeUntil(this.destroy)).subscribe(status => {
      this.loader = status;
    });
    this.loaderService.loaderText$.pipe(takeUntil(this.destroy)).subscribe(text => {
      this.text = text;
    });
  }

  receiveCollapsed($event: boolean) {
    this.collapedSideBar = $event;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }

}
