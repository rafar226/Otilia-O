import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../features/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('../features/chat/chat.module').then(m => m.ChatModule),
      },
      {
        path: 'saved-chats',
        loadChildren: () => import('../features/saved-chats/saved-chat.module').then(m => m.SavedChatModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
