import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from 'src/app/features/chat/chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbCollapseModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ForoComponent } from 'src/app/features/foro/foro.component';
import { OptionComponent } from 'src/app/features/option/option.component';
import { SafePipe } from 'src/app/shared/url.pipe';
import { CourseComponent } from 'src/app/shared/components/course/course.component';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, FormsModule, NgbCarouselModule, NgbCollapseModule, NgbRatingModule],
  declarations: [DashboardComponent, ChatComponent, OptionComponent, ForoComponent, SafePipe, CourseComponent],
  providers: [],
})
export class DashboardModule {}
