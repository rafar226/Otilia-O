import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
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

  // currentUserOtilia!: UserOtilia | undefined;
  currentUser!: User;
  userUid: string = '';

  private currentUserOtiliaSubject = new BehaviorSubject<UserOtilia | undefined>(undefined);
  currentUserOtilia$: Observable<UserOtilia | undefined> = this.currentUserOtiliaSubject.asObservable();

  constructor(
    private modalService: NgbModal,
    private firestore: Firestore,
  ) {
    // super();
  }

  addNewUser(newUser: User, displayName: string){
    console.log(newUser)
    const user: UserOtilia = {
      uid: newUser.uid,
      email: newUser.email ? newUser.email : '',
      name: '',
      lastName: '',
      nickName: displayName,
      profileImg: '',
      nationality: '',
      isEmailValid: false,
      conversations: []
    }
    const createdUserRef = collection(this.firestore, 'Users');
    return addDoc(createdUserRef, user)
    // .then(newUser => {

      // this.getAllUsers().subscribe(users => {
      //   const currentUser = users.find(x => x.uid === this.userUid);
      //   if(currentUser) {
      //     this.currentUserOtilia = currentUser;
      //     this.setCurrentUserOtilia(currentUser);
      //   }
      // })
    // });
  }

  getAllUsers(): Observable<UserOtilia[]> {
    const createdUserRef = collection(this.firestore, 'Users');
    return collectionData(createdUserRef, {idField: 'id'}) as Observable<UserOtilia[]>;
  }

  getUserInfo(uId: string) {
    const createdUserRef = collection(this.firestore, `Users/${uId}`);
    return (createdUserRef)
  }

  // setCurrentUserOtilia(currentUserOtilia: UserOtilia) {
  //   this.currentUserOtilia = currentUserOtilia;
  // }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  getCurrentUser(){
    return this.currentUser;
  }


  setCurrentUserOtilia(currentUserOtilia: UserOtilia) {
    this.currentUserOtiliaSubject.next(currentUserOtilia);
  }

  getCurrentUserOtilia(){
    return this.currentUserOtilia$;
  }

}
