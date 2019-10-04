// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'undefined',
  assignmentProjectJira: 'TREM',
  gitHash: 'GIT_HASH_PLACEHOLDER',
  apiUrl: 'http://localhost:5000/api',
  itSystemAccessGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/report-issue-it-systems-access-get',
  preStartConfirmAccessesGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/confirm-accesses-get',
  preStartConfirmAccessesPutUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/confirm-accesses-put',
  remoteUMaterialsReportIssueGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/report-issue-remote-u-materials-get',
  codeRepositoryIssueGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/reporting_issue_code_repo_get',
  reportIssuePostUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/reporting_issue_post',
  checkAssignmentFolderGetUrl: 'https://aajp1n4sv1.execute-api.us-east-1.amazonaws.com/development/check-drive',
  readyToStartGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/ready-to-start-get',
  jiraStatusGetUrl: 'https://yjc5fqkq9c.execute-api.us-east-1.amazonaws.com/development/jira-check',
  ticketsAssignedGetUrl: 'https://e4bfuf2e5h.execute-api.us-east-1.amazonaws.com/development/backlog_status'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
