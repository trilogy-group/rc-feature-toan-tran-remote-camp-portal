// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'undefined',
  gitHash: 'GIT_HASH_PLACEHOLDER',
  apiUrl: 'http://localhost:5000/api',
  itSystemAccessStatusUrl:
    'https://cl2w37ym50.execute-api.us-east-1.amazonaws.com/development/sls-ad-check-lambda-development-AutoVerifyAD',
  codeRepositoryAccessStatusUrl: 'https://kpruiaficl.execute-api.us-east-1.amazonaws.com/development/git-verify',
  remoteUMaterialsAccessStatusUrl: 'https://al4vo4fece.execute-api.us-east-1.amazonaws.com/development/check-member'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
