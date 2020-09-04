// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // baseUrl: 'https://localhost:5001/api',
    // file_path: 'https://localhost:5001/files/',
    // notification_url: 'https://localhost:5001/signalr',

    baseUrl: 'https://api.youtradein.com/api',
    file_path: 'https://api.youtradein.com/files/',
    notification_url: 'https://api.youtradein.com/signalr',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
