import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  challenges = [
    {
      id:'Waste Reduction',
      title: 'Waste Reduction Challenge',
      description: 'Minimize your waste output by recycling and composting.',
      icon: 'leaf-outline'
    },
    {
      id: 'Energy Conservation',
      title: 'Energy Conservation Challenge',
      description: 'Reduce your energy consumption by turning off unused lights and electronics.',
      icon: 'flash-outline'
    },
      ];

  constructor(private navCtrl: NavController, private router: Router) {}

  // openChallenge(challengeId: string) {
  //   this.router.navigate(['/challenges', challengeId]);
  // }

  openChallenge(challengeId: string) {
    this.router.navigate(['/challenges', challengeId]);
  }
  
}



