import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AuthGuard} from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]  // Protect the tabs route with the AuthGuard
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  
  // {
  //   path:'lessons',
  //   loadChildren: () => import('./lessons/lessons.module').then( m => m.LessonsModule),
  //   canActivate: [AuthGuard]

  // },
  {
    path:'challenges/:id',
    loadChildren: () => import('./challenges/challenges.module').then( m => m.ChallengesModule),
    canActivate: [AuthGuard]
    
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
