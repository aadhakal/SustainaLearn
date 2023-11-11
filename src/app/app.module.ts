// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';


// // AngularFire Imports
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// // Environment import for Firebase configuration
// import { environment } from '../environments/environment';


// import { initializeApp } from "firebase/app";

// initializeApp(environment.firebaseConfig);


// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     AngularFireModule.initializeApp(environment.firebaseConfig),
//     BrowserModule,
//     IonicModule.forRoot(),
//     AppRoutingModule,
//     AngularFireAuthModule,
//     AngularFireStorageModule,  // If using Firebase Storage
//   ],
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// AngularFire Imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Environment import for Firebase configuration
import { environment } from '../environments/environment';
import { initializeApp } from "firebase/app";


initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase here
    AngularFireAuthModule,
    AngularFireStorageModule, // If using Firebase Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
