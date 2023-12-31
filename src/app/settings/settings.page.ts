import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit {
  themeToggle = false;

  constructor(private navCtrl: NavController) {
    this.themeToggle = document.body.classList.contains('dark');
  }
  
  ngOnInit() {}

  toggleChange() {
    this.themeToggle = !this.themeToggle;
    document.body.classList.toggle('dark', this.themeToggle);
  }

 

  navigateBack() {
    this.navCtrl.back();
  }
}
