import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  getChallenge(id: string): Observable<any> {
    return this.firestore.collection('challenges').doc(id).valueChanges();
  }

  // Add other methods for add/update if needed in the future
}
