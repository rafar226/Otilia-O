import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CourseComponent } from 'src/app/shared/components/course/course.component';
import { OpinionComponent } from 'src/app/shared/components/opinions/opinions.component';
import { Course, Opinion } from 'src/app/shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [NgbRatingConfig]
})
export class CoursesComponent implements OnInit {
@ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
courses: Course[] = [];
filter: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private firestore: Firestore,
    private config: NgbRatingConfig
  ) {
    config.max = 5;
		config.readonly = true;
  }

  ngOnInit() {
    this.createCourses();
  }

  createCourses() {
    const createdTutorialsRef = collection(this.firestore, 'Tutorials');
    const courses = collectionData(createdTutorialsRef, {idField: 'id'}) as Observable<Course[]>

    courses.subscribe((courses: any) => {
      this.courses = courses
    });
  }

  right() {
    this.scrollContainer.nativeElement.scrollTo({ left: (this.scrollContainer.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  left() {
    this.scrollContainer.nativeElement.scrollTo({ left: (this.scrollContainer.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  goToCourse(course: Course) {
    const modalRef = this.modalService.open(CourseComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });
    modalRef.componentInstance.course = course;
  }

  goToOpinions(opinions: Opinion[]) {
    const modalRef = this.modalService.open(OpinionComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });
    modalRef.componentInstance.opinions = opinions;
    modalRef.result.then(
      (result: any) => {
        console.log('result', result)
      },
      () => {
        return;
      }
    );
  }
}
