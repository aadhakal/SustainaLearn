// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}


export const environment:Environment = {
  production: false,
   firebaseConfig:{
    apiKey: "AIzaSyBUcRhAkQdMJnjjHWxZ8z0adnK1rwU93_4",
    authDomain: "sustainability-challenges-app.firebaseapp.com",
    projectId: "sustainability-challenges-app",
    storageBucket: "sustainability-challenges-app.appspot.com",
    messagingSenderId: "487843459170",
    appId: "1:487843459170:web:3e798b8b5d461c598b213b"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
