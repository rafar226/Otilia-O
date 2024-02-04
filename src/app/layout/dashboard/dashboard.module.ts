import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from 'src/app/chat/chat.component';
import { OptionBubblesComponent } from 'src/app/option-bubbles/option-bubbles.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule],
  declarations: [DashboardComponent, ChatComponent, OptionBubblesComponent],
  providers: [],
})
export class DashboardModule {}
