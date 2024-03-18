import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
} from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { UserOtilia } from '../shared/user-Otilia.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private auth = inject(Auth);

  currentUserOtilia!: UserOtilia | null;
  currentUser!: User;
  userUid: string = '';
  currentIdPlayer: string | undefined = ''


  // private userDataSubject = new BehaviorSubject<User | null>(null);
  // userData$: Observable<User | null> = this.userDataSubject.asObservable();

  constructor(
    private modalService: NgbModal,
    private firestore: Firestore,
  ) {
    // super();

  }

  addNewUser(newUser: User, displayName: string){
    const user: UserOtilia = {
      uid: newUser.uid,
      email: newUser.email,
      name: '',
      lastName: '',
      nickName: displayName,
      profileImg: '',
      nationality: '',
      isEmailValid: false
    }
    const createdUserRef = collection(this.firestore, 'Users');
    return addDoc(createdUserRef, user).then(newUser => {

      this.getAllUsers().subscribe(users => {
        const currentUser = users.find(x => x.uid === this.userUid);
        if(currentUser) {
          this.currentUserOtilia = currentUser;
          this.setCurrentUserOtilia(currentUser);
        }
      })
    });
  }

  getAllUsers(): Observable<UserOtilia[]> {
    const createdUserRef = collection(this.firestore, 'Users');
    return collectionData(createdUserRef, {idField: 'id'}) as Observable<UserOtilia[]>;
  }

  getUserInfo(uId: string) {
    const createdUserRef = collection(this.firestore, `Users/${uId}`);
    return (createdUserRef);
  }

  setCurrentUserOtilia(currentUserPlayBee: UserOtilia) {
    this.currentUserOtilia = currentUserPlayBee;
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentId(id: string){
    this.currentIdPlayer = id;
  }

  getCurrentId(){
    return this.currentIdPlayer;
  }

}
