// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'undefined',
  assignmentProjectJira: 'TREM',
  gitHash: 'GIT_HASH_PLACEHOLDER',
  apiUrl: 'http://localhost:5000/api',
  googleClientId: '833875804511-7quv82va3lpm63b1ap0ob0c5sjjms8nq.apps.googleusercontent.com',
  itSystemAccessGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/report-issue-it-systems-access-get',
  preStartConfirmAccessesGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/confirm-accesses-get',
  preStartConfirmAccessesPutUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/confirm-accesses-put',
  remoteUMaterialsReportIssueGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/report-issue-remote-u-materials-get',
  codeRepositoryIssueGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/reporting_issue_code_repo_get',
  reportIssuePostUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/reporting_issue_post',
  checkAssignmentFolderGetUrl: 'https://1w7y8f0ox9.execute-api.us-east-1.amazonaws.com/dev/check-drive',
  readyToStartGetUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/ready-to-start-get',
  jiraStatusGetUrl: 'https://a185kccj8c.execute-api.us-east-1.amazonaws.com/dev/jira-check',
  ticketsAssignedGetUrl: 'https://cj84gm0eh7.execute-api.us-east-1.amazonaws.com/dev/backlog_status',
  remoteUCodeRepoAccess: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/check-remotecamp-public-access',
  workSmartTrainingsUrl: 'https://nqgh2fcnx5.execute-api.us-east-1.amazonaws.com/dev/ws-pro',
  technicalTrainingsUrl: 'https://nqgh2fcnx5.execute-api.us-east-1.amazonaws.com/dev/technical',
  communicationChannelAccessUrl: 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/check-xoChat-registeration-get',
  knowledgeBaseUrl: 'https://3ont4uqzx2.execute-api.us-east-1.amazonaws.com/dev/refresh-kb',
  tutorialsBaseUrl: 'https://qo7poxyzj6.execute-api.us-east-1.amazonaws.com/dev/tutorials',
  knowledgeBaseStatusUrl: 'https://3ont4uqzx2.execute-api.us-east-1.amazonaws.com/dev/status'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
