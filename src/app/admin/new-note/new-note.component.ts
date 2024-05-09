import { Component, Input, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil, tap } from 'rxjs';
import { Note } from '../admin/notes.model';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
  @Input() currentNote!: Note;
  text = '';
  status = '';

  private activeModal = inject(NgbActiveModal);
  user: User | null = null;
  unsubscribe$ = new Subject<void>();

  constructor(
      private authService: AuthService
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

  closeModal() {
    const note: Note = {
      text: this.text,
      author: this.user?.displayName ? this.user?.displayName : '',
      date: new Date().toString(),
      state: this.status,
    }

    this.activeModal.close(note);
  }

  dismissModal() {
    this.activeModal.close('dismiss');
  }
}
