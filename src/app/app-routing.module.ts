import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoComponent } from './features/foro/foro.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
