import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ChatService } from 'src/app/features/chat/chat.service';
import { AuthService } from 'src/app/services';
import { ToastService } from 'src/app/shared/components/amos-toast';
import Swal from 'sweetalert2'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  newMessage: string = '';
  user: User | null = null;

  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private chatService: ChatService
  ) {
    this.authService
      .userState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((user) => {
          if (user) {
            this.user = user;
          }
        })
      )
    .subscribe();
  }

  ngOnInit() {
  }

  send(text: string) {
    if(text === '') {
      return;
    }

    if(!this.user) {
      Swal.fire('Please log in to use our chat.')
      return;
    }

    this.newMessage = '';
    this.chatService.shareData(text);
    this.router.navigate(['./chat'])
  }

  // expand() {
  //   this.isVideoCollapsed = this.isVideoCollapsed ? false : true;
  //   this.isChatCollapsed = this.isChatCollapsed ? false : true;
  // }

  // createCourses() {
  //   this.courses = [
  //     {
  //       name: 'Curso de respiración',
  //       duration: '07:30 minutos',
  //       teacher: 'Leticia',
  //       opinions: [],
  //       rating: 5,
  //       link: 'https://www.youtube.com/embed/QBR0xgGwBoQ?si=kjeGNAWiUE_WsDyL',
  //       img: './../../../assets/images/yoga.png',
  //       front: './../../../assets/images/video-uno.png'
  //     },
  //     {
  //       name: 'Curso de relajación',
  //       duration: '11:30 minutos',
  //       teacher: 'Leticia',
  //       opinions: [],
  //       rating: 3.5,
  //       link: 'https://www.youtube.com/embed/RBQyzF0Jzls?si=UBhEq4DpKWFBr6_Q',
  //       img: './../../../assets/images/doctor.jpg',
  //       front: './../../../assets/images/video-dos.png'
  //     },
  //     {
  //       name: 'Ejercicio de piernas',
  //       duration: '05:30 minutos',
  //       teacher: 'Leticia',
  //       opinions: [],
  //       rating: 4.5,
  //       link: 'https://www.youtube.com/embed/mPl2-xjt5rE?si=s64-303U4JIRr6vY',
  //       img: './../../../assets/images/doctor.jpg',
  //       front: './../../../assets/images/video-tres.png'
  //     },
  //     {
  //       name: 'Ejercicios de zona pélvica',
  //       duration: '05:30 minutos',
  //       teacher: 'Leticia',
  //       opinions: [],
  //       rating: 4.5,
  //       link: 'https://www.youtube.com/embed/utpLRsW5IFs?si=UYnKQpi008Qc6JwP',
  //       img: './../../../assets/images/fisio.jpg',
  //       front: './../../../assets/images/video-dos.png'
  //     },
  //     {
  //       name: 'Rutinas',
  //       duration: '05:30 minutos',
  //       teacher: 'Leticia',
  //       opinions: [],
  //       rating: 4.5,
  //       link: 'https://www.youtube.com/embed/hBV2atgu-9c?si=wHfK6cDmHZQwhV6a',
  //       img: './../../../assets/images/preparador.jpg',
  //       front: './../../../assets/images/video-uno.png'
  //     }
  //   ]
  // }

  // right() {
  //   this.scrollContainer.nativeElement.scrollTo({ left: (this.scrollContainer.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  // }

  // left() {
  //   this.scrollContainer.nativeElement.scrollTo({ left: (this.scrollContainer.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  // }

  // goToCourse(course: Course) {
  //   const modalRef = this.modalService.open(CourseComponent, {
  //     ariaLabelledBy: 'modal-basic-title',
  //     centered: true,
  //     size: 'lg',
  //     backdrop : 'static',
  //     keyboard : false
  //   });
  //   modalRef.componentInstance.course = course;
  // }
}
