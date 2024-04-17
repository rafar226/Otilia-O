import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../course.model';

@Component({
  selector: 'app-course',
  // imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() course!: Course;

  rating = 8;
  private activeModal = inject(NgbActiveModal);

  closeModal() {
    this.activeModal.close('close');
  }

  dismissModal() {
    this.activeModal.close('dismiss');
  }
}
