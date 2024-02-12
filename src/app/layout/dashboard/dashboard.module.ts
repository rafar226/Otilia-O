import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from 'src/app/features/chat/chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ForoComponent } from 'src/app/features/foro/foro.component';
import { OptionComponent } from 'src/app/features/option/option.component';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, FormsModule, NgbCarouselModule],
  declarations: [DashboardComponent, ChatComponent, OptionComponent, ForoComponent],
  providers: [],
})
export class DashboardModule {}
