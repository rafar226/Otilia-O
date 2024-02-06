import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from 'src/app/chat/chat.component';
import { OptionBubblesComponent } from 'src/app/option-bubbles/option-bubbles.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, FormsModule],
  declarations: [DashboardComponent, ChatComponent, OptionBubblesComponent],
  providers: [],
})
export class DashboardModule {}
