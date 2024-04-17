import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedChatsComponent } from './saved-chats.component';

const routes: Routes = [
  {
    path: '',
    component: SavedChatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SavedChatsRoutingModule {}
