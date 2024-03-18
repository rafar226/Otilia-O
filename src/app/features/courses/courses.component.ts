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
        name: 'Curso de respiración',
        duration: '07:30 minutos',
        teacher: 'Leticia',
        opinions: [],
        rating: 5,
        link: 'https://www.youtube.com/embed/QBR0xgGwBoQ?si=kjeGNAWiUE_WsDyL',
        img: './../../../assets/images/yoga.png',
        front: './../../../assets/images/video-uno.png'
      },
      {
        name: 'Curso de relajación',
        duration: '11:30 minutos',
        teacher: 'Leticia',
        opinions: [],
        rating: 3.5,
        link: 'https://www.youtube.com/embed/RBQyzF0Jzls?si=UBhEq4DpKWFBr6_Q',
        img: './../../../assets/images/doctor.jpg',
        front: './../../../assets/images/video-dos.png'
      },
      {
        name: 'Ejercicio de piernas',
        duration: '05:30 minutos',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/mPl2-xjt5rE?si=s64-303U4JIRr6vY',
        img: './../../../assets/images/doctor.jpg',
        front: './../../../assets/images/video-tres.png'
      },
      {
        name: 'Ejercicios de zona pélvica',
        duration: '05:30 minutos',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/utpLRsW5IFs?si=UYnKQpi008Qc6JwP',
        img: './../../../assets/images/fisio.jpg',
        front: './../../../assets/images/video-dos.png'
      },
      {
        name: 'Rutinas',
        duration: '05:30 minutos',
        teacher: 'Leticia',
        opinions: [],
        rating: 4.5,
        link: 'https://www.youtube.com/embed/hBV2atgu-9c?si=wHfK6cDmHZQwhV6a',
        img: './../../../assets/images/preparador.jpg',
        front: './../../../assets/images/video-uno.png'
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
