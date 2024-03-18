import { Injectable } from '@angular/core';
import { ToastInfo } from '../models/toast.info.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfo[] = [];
  showSucess(body: string, header?: string, delay?: number) {
    this.toasts.push({ header: header || '', body, classname: 'bg-success text-light' });
  }

  showError(body: string, header?: string, delay?: number) {
    this.toasts.push({ header: header || '', body, classname: 'bg-danger text-light' });
  }

  showWarning(body: string, header?: string, delay?: number) {
    this.toasts.push({ header: header || '', body, classname: 'bg-warning text-dark' });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
