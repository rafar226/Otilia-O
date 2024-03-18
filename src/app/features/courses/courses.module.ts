import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CoursesRoutingModule],
  declarations: [CoursesComponent],
})
export class CoursesModule {}
