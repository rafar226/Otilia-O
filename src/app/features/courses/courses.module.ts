import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { FilterPipe } from "../../shared/filter.pipe";


@NgModule({
    declarations: [CoursesComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, CoursesRoutingModule, FilterPipe]
})
export class CoursesModule {}
