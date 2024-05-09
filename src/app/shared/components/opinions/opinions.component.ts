import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course, Opinion } from '../../course.model';
import { User } from '@angular/fire/auth';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-opinions',
  // imports: [CommonModule],
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss'],
})
export class OpinionComponent {
  @Input() opinions!: Opinion[];
  newOpinion = '';
  rating = 0;
  private activeModal = inject(NgbActiveModal);
  user: User | null = null;
  unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService    ) {
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

  closeModal() {
    const opinion: Opinion = {
      opinionId: new Date().getTime().toString(),
      text: this.newOpinion,
      user: this.user?.displayName ? this.user?.displayName : '',
      userId: this.user?.uid ? this.user?.uid : ''
    }

    this.activeModal.close([opinion, this.rating]);
  }

  dismissModal() {
    this.activeModal.close('dismiss');
  }

  // saveOpinions() {
  //   this.closeModal()
  // }
}
