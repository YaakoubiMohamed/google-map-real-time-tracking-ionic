// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDUhGJdTt04UnJ04VYfWiAjWDOZ3oMs6-E",
    authDomain: "application-80431.firebaseapp.com",
    databaseURL: "https://application-80431.firebaseio.com",
    projectId: "application-80431",
    storageBucket: "application-80431.appspot.com",
    messagingSenderId: "88965398296",
    appId: "1:88965398296:web:61ae2a7a0cda753c32a86d",
    measurementId: "G-8CZ51XQ063"
  },
  onesignal: {
    appId: '283dff16-09bf-4c49-b5c9-18d86146b03c',
    googleProjectNumber: '',
    restKey: 'ODFhNjIwMTUtZWJjYy00N2IyLTkyNzQtZTk3ZGI2M2FhMjgy'
  },
  stripe: {
    sk: ''
  },
  paypal: {
    sandbox: '',
    production: 'YOUR_PRODUCTION_CLIENT_ID'
  },
  general: {
    symbol: '$',
    code: 'USD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
