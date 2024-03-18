import { Provider } from '@angular/core';
import { ToastComponent } from './components';

export * from './components';
export * from './models';
export * from './services';

export const TOAST_COMPONENTS: Provider[] = [ToastComponent];
