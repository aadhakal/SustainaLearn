
import { Injectable } from '@angular/core';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged, 
  UserCredential, 
  User 
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {
    const auth = getAuth();

    // Listen to authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see user variable for user details
        this.currentUser = user;
        this.persistUser(user);
      } else {
        // User is signed out
        this.currentUser = null;
        this.persistUser(null);
      }
    });
  }

  private persistUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({
        uid: user.uid, // Persist only the UID or any non-sensitive data
        email: user.email,
        // Do not store sensitive data here like tokens or personal information
      }));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  async signUp(name: string, email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      await this.createUserProfile(userCredential.user, name, email);
      // The onAuthStateChanged listener will handle setting the currentUser
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async createUserProfile(user: User, name: string, email: string): Promise<void> {
    const db = getFirestore();
    await setDoc(doc(db, 'users', user.uid), {
      displayName: name,
      email: email,
      photoURL: '', // Set a default or leave it empty
      // ...any other default fields you want to set on profile creation...
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle setting the currentUser
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const auth = getAuth();
    try {
      await signOut(auth);
      // onAuthStateChanged will handle the currentUser state
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

