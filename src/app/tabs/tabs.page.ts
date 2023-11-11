import { Component } from '@angular/core';
// import {AuthService} from ''
import {Router} from '@angular/router'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

constructor(private router:Router) {}
onLogin(){
 this.router.navigate(['/tabs/tab1']); 
}

  
onLogout() {
  this.router.navigate(['/tabs/tab1']);
 }

}
