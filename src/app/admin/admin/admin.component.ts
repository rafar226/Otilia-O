import { Component } from '@angular/core';
import { Note } from './notes.model';
import { Observable, Subject } from 'rxjs';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewNoteComponent } from '../new-note/new-note.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  notes: Note[] = [];
  unsubscribe$ = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private firestore: Firestore,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete;
  }

  ngOnInit(){
    this.getAllNotes().subscribe(notes => {
      this.notes = notes;
    })
  }

  getAllNotes(): Observable<Note[]> {
    const createdUserRef = collection(this.firestore, 'Notes');
    return collectionData(createdUserRef, {idField: 'id'}) as Observable<Note[]>;
  }

  getNoteInfo(uId: string) {
    const createdUserRef = collection(this.firestore, `Users/${uId}`);
    return (createdUserRef)
  }

  addNewNote(){
    const modalRef = this.modalService.open(NewNoteComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    modalRef.result.then(
      (note: Note) => {
        const newNote: Note = {
          text: note.text,
          author: note.author,
          date: new Date().toString(),
          state: note.state,
        }
        const createdNotesRef = collection(this.firestore, 'Notes');
        return addDoc(createdNotesRef, newNote)
      },
      () => {
        return;
      }
    );
  }
}
