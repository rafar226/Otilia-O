import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from 'src/app/shared/components/course/course.component';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
@ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
courses: Course[] = [];
filter: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.createCourses();
  }

  createCourses() {
    this.courses = [
      {
        name: 'Breathing course',
        duration: '07:30 minutes',
        teacher: 'Leticia',
        opinions: [],
        rating: 5,
        link: 'https://www.youtube.com/embed/QBR0xgGwBoQ?si=kjeGNAWiUE_WsDyL',
        img: './../../../assets/images/video-uno.png',
        front: './../../../assets/images/video-uno.png',
        favorite: true
      },
      {
        name: 'Relaxation course',
        duration: '11:30 minutes',
        teacher: 'Leticia',
        opinions: [],
        rating: 3.5,
        link: 'https://www.youtube.com/embed/RBQyzF0Jzls?si=UBhEq4DpKWFBr6_Q',
        img: './../../../assets/images/video-dos.png',
        front: './../../../assets/images/video-dos.png',
        favorite: true
      },
      {
        name: 'Leg exercise',
        duration: '05:30 minutes',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/mPl2-xjt5rE?si=s64-303U4JIRr6vY',
        img: './../../../assets/images/video-tres.png',
        front: './../../../assets/images/video-tres.png',
        favorite: false
      },
      {
        name: 'Pelvic area exercises',
        duration: '05:30 minutes',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/utpLRsW5IFs?si=UYnKQpi008Qc6JwP',
        img: './../../../assets/images/video-dos.png',
        front: './../../../assets/images/video-dos.png',
        favorite: false
      },
      {
        name: 'Routines',
        duration: '05:30 minutes',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/hBV2atgu-9c?si=wHfK6cDmHZQwhV6a',
        img: './../../../assets/images/video-uno.png',
        front: './../../../assets/images/video-uno.png',
        favorite: true
      }
    ]
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
}
