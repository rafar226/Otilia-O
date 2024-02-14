import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderResponseSubject$ = new Subject<boolean>();
  private loaderTextSubject$ = new Subject<string>();

  loaderResponse$ = this.loaderResponseSubject$.asObservable();
  loaderText$ = this.loaderTextSubject$.asObservable();

  showSpinner() {
    this.loaderResponseSubject$.next(true);
  }

  hideSpinner() {
    this.loaderResponseSubject$.next(false);
  }

  showText(text: string) {
    this.loaderTextSubject$.next(text);
  }

  hideText() {
    this.loaderTextSubject$.next('');
  }


}
