import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../firebase.auth';
import { UserProfileService } from '../user-profile.service';
import { OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';



@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss'],
})
export class UserProfilePage implements OnInit { 

  

  username: string = 'John Doe';
  email: string = 'johndoe@example.com';
  profilePicture: string = 'assets/images/default-Profile.png';

  constructor(
    public alertController: AlertController, 
    private navCtrl: NavController, 
    private authService: AuthService,  
    private userProfileService: UserProfileService  
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

// In your UserProfilePage
private loadUserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const db = getFirestore();
    const userDoc = doc(db, "users", user.uid);
    getDoc(userDoc).then(docSnapshot => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        this.username = userData['displayName'];
        this.email = userData['email'];
        this.profilePicture = userData['photoURL'];
      }
    });
  }
}


async editProfile() {
  const alert = await this.alertController.create({
    header: 'Edit Username',
    inputs: [
      {
        name: 'username',
        type: 'text',
        value: this.username
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Save',
        handler: (data) => {
          this.username = data.username;
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            const uid = user.uid;
            const email = user.email || 'email not provided';  // Handle scenario where email is null or undefined
            this.userProfileService.saveUserProfile(uid, this.username, email, this.profilePicture).toPromise().then(() => {
              console.log('Profile updated successfully');
              // Handle successful update, maybe notify the user
            }, (error: any) => {
              console.error('Error updating profile:', error);
              // Handle error, maybe notify the user
            });
          } else {
            console.error('No user is logged in');
            // Handle no user logged in scenario
          }
        }
      }
    ]
  });

  await alert.present();
}

  async changeProfilePicture() {
    const newProfilePicture = await this.userProfileService.takePicture();
    if (newProfilePicture) {
      this.profilePicture = newProfilePicture;
      await this.userProfileService.updateProfilePicture(this.profilePicture);  // Update profile picture in Firestore
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      // Navigate to the login page or perform other actions on successful sign out
      this.navCtrl.navigateRoot('/login');
    });
  }

  async confirmDeactivation() {
    const alert = await this.alertController.create({
      header: 'Confirm Deactivation',
      message: 'Are you sure you want to deactivate?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Deactivate',
          handler: () => {
            this.deactivateAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  async deactivateAccount() {
    try {
      await this.userProfileService.deactivateAccount();
      // Navigate to the login page or perform other actions on successful account deactivation
      this.navCtrl.navigateRoot('/signup');
    } catch (error) {
      console.error('Error deactivating account:', error);
      // Handle error, maybe notify the user
    }
  }

  navigateBack() {
    this.navCtrl.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notice',
      message: 'This feature has not been implemented yet.',
      buttons: ['OK']
    });
    await alert.present();
  }

}


