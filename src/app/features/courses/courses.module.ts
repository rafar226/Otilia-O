import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { FilterPipe } from "../../shared/filter.pipe";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { OpinionComponent } from 'src/app/shared/components/opinions/opinions.component';


@NgModule({
    declarations: [CoursesComponent, OpinionComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, CoursesRoutingModule, FilterPipe, NgbRatingModule]
})
export class CoursesModule {}
