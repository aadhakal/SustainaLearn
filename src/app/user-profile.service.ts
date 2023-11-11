import { Injectable } from '@angular/core';
import { getAuth, updateProfile, User } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { Observable, from } from 'rxjs';
import { signOut } from 'firebase/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface UserProfile {
  displayName: string;
  email: string;
  isActive: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  constructor() { }

  getUserDetails(): Observable<User | null> {
    const auth = getAuth();
    return from(Promise.resolve(auth.currentUser));
  }

  public async takePicture(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
  
    if (image.dataUrl === undefined) {
      throw new Error('Failed to capture photo');
    }
  
    return image.dataUrl;
  }

  // Update the profile picture
  updateProfilePicture(photoURL: string): Observable<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      return from(Promise.all([
        updateProfile(user, { photoURL }),
        updateDoc(userDoc, { photoURL })
      ]).then(() => {}));
    } else {
      return from(Promise.reject('No user logged in'));
    }
  }
  

  // Update the username
  updateUsername(displayName: string): Observable<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      // Updating both Firebase Auth profile and Firestore document
      return from(Promise.all([
        updateProfile(user, { displayName }),
        updateDoc(userDoc, { displayName })
      ]).then(() => {}));
    } else {
      // Throw an error if no user is logged in
      return from(Promise.reject('No user logged in'));
    }
  }

  // Deactivate the current user's account
  async deactivateAccount(): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      try {
        await updateDoc(userDoc, { isActive: false });
        await signOut(auth);
      } catch (error) {
        console.error('Error deactivating account: ', error);
        throw error;  // or handle error as needed
      }
    } else {
      throw new Error('No user logged in');
    }
  }

  saveUserProfile(uid: string, username: string, email: string, photoURL: string): Observable<void> {
    const db = getFirestore();
    const userDoc = doc(db, "users", uid);
    return from(updateDoc(userDoc, {
      displayName: username,
      email: email,
      photoURL: photoURL
    }));
  }

  updateProfile(username: string): Observable<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return from(updateProfile(user, { displayName: username }));
    } else {
      return from(Promise.reject('No user logged in'));
    }
  }

}


