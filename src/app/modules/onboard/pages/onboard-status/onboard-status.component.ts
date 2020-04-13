import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { subDays } from 'date-fns';
import { DfToasterService, DfPortalService, DfPortalOptions, DfPortalOrientation } from '@devfactory/ngx-df';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { OnboardingService } from 'src/app/shared/services/onboarding.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import {UtilsService} from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-onboard-status',
  templateUrl: './onboard-status.component.html',
  styleUrls: ['./onboard-status.component.scss']
})
export class OnboardStatusComponent implements OnInit {
  private readonly allSet = 'All Set';
  private readonly notAllSet = 'You\'re Almost There';
  private readonly confirmAccessesText = 'Confirm';
  private readonly accessesConfirmedText = 'Confirmed';

  private portalOptions = new DfPortalOptions();

  public constructor(
    private readonly onboardingService: OnboardingService,
    private readonly profileService: ProfileService,
    private readonly toasterService: DfToasterService,
    private readonly utilsService: UtilsService,
    private portal: DfPortalService
  ) {
    this.portalOptions.showCloseButton = true;
    this.portalOptions.orientation = DfPortalOrientation.Right;
    this.portalOptions.width = '600px';
  }

  @ViewChild('trainingMaterial')
  public trainingsTemplate: TemplateRef<{}>;

  public preStartInfo: any;

  public loadedItAccessSystems = false;

  public loadedRemoteUMaterials = false;

  public loadedCodeRepositoryAccess = false;

  public showCodeRepositoryAccess = false;

  public itSystemsIssueReported = false;

  public remoteUMaterialsIssueReported = false;

  public codeRepositoryIssueReported = false;

  public loadedAssignmentFolder = false;

  public loadedReadyToStart = false;

  public loadedJiraStatus = false;

  public loadedTicketsAssigned = false;

  public loadedAccessesConfirmed = false;

  public loadedRemoteUCodeBase = false;

  public loadedCommunicationChannel = false;

  public getHeaderText(): string {
    return this.preStartInfo &&
      this.preStartInfo.ticketsAssigned &&
      this.preStartInfo.assignmentFolder &&
      this.preStartInfo.accesses.jira &&
      this.preStartInfo.readyToStart ? this.allSet : this.notAllSet;
  }

  public ngOnInit(): void {
    let profile;

    this.profileService.getProfile().pipe
    (
      flatMap((userProfile) => {
        profile = userProfile;
        return forkJoin(
          this.onboardingService.getPreStartInfo(),
          this.onboardingService.getAccessesConfirmed(profile.companyEmail)
        );
      })
    )
    .subscribe(([preStartInfo, accessesConfirmed]) => {
      this.preStartInfo = preStartInfo;
      this.preStartInfo.name = profile.icName;
      this.preStartInfo.pipeline = profile.pipeline;
      this.preStartInfo.remoteUModuleId = profile.remoteUModuleId;
      this.preStartInfo.startDate = profile.startDate;
      this.preStartInfo.alternativeEmail = profile.xoLoginEmail;
      this.preStartInfo.email = profile.companyEmail;
      this.preStartInfo.ad = profile.adAccount;
      this.preStartInfo.accessesConfirmed = accessesConfirmed && accessesConfirmed.status === 'Yes';
      this.showCodeRepositoryAccess = !this.isPipelineWithoutGithubAccount();
      this.loadedAccessesConfirmed = true;

      if (!this.preStartInfo.accessesConfirmed) {
        this.onboardingService.getItSystemAccess(this.preStartInfo.ad)
          .subscribe(
            statusResponse => {
              this.loadedItAccessSystems = true;
              this.preStartInfo.accesses.itSystems = statusResponse && statusResponse.status === 'Yes';
              this.itSystemsIssueReported = statusResponse && statusResponse.reported === 'Yes';
            },
            () => this.toasterService.popError('Unable to get it system access status')
          );
        this.onboardingService.getRemoteUMaterialsAccess(this.preStartInfo.email)
          .subscribe(
            statusResponse => {
              this.loadedRemoteUMaterials = true;
              this.preStartInfo.accesses.remoteUMaterials = statusResponse && statusResponse.status === 'Yes';
              this.remoteUMaterialsIssueReported = statusResponse && statusResponse.reported === 'Yes';
            },
            () => this.toasterService.popError('Unable to get remote material access status')
          );

        if (this.showCodeRepositoryAccess) {
          this.onboardingService.getReportCodeRepositoryIssue(this.preStartInfo.email)
            .subscribe(
              statusResponse => {
                this.preStartInfo.reportedIssueCodeRepository = statusResponse && statusResponse.reported === '1';
                this.preStartInfo.accesses.codeRepository = statusResponse && statusResponse.trilogy_status === 'Yes';
                this.codeRepositoryIssueReported = this.preStartInfo.reportedIssueCodeRepository;
                this.loadedCodeRepositoryAccess = true;
              },
              () => this.toasterService.popError('Unable to get it reported issue code repository status')
            );
        }
      } else {
        this.loadFinalStageServices();
      }
    });
  }

  public getDefaultETA(): Date {
    return subDays(this.preStartInfo.startDate, 2);
  }

  public getJiraETA(): Date {
    return subDays(this.preStartInfo.startDate, 3);
  }

  public accessesConfirmed(): boolean {
    return this.preStartInfo && this.preStartInfo.accessesConfirmed;
  }

  public isConfirmButtonDisabled(): boolean {
    return this.accessesConfirmed() || !(
      this.preStartInfo && this.preStartInfo.accesses &&
      (this.preStartInfo.accesses.codeRepository || this.isPipelineWithoutGithubAccount()) &&
      this.preStartInfo.accesses.remoteUMaterials &&
      this.preStartInfo.accesses.itSystems
    );
  }

  public isItSystemsReportIssueButtonDisabled(): boolean {
    return this.itSystemsIssueReported;
  }

  public isItSystemsReportIssueButtonVisible(): boolean {
    return (
      this.loadedItAccessSystems &&
      this.preStartInfo &&
      this.preStartInfo.accesses &&
      !this.preStartInfo.accesses.itSystems
    );
  }

  public reportItSystemsIssue(): void {
    this.onboardingService.reportItSystemsIssue(this.preStartInfo.name, this.preStartInfo.ad)
      .subscribe(() => this.itSystemsIssueReported = true);
  }

  public isRemoteUMaterialsIssueButtonDisabled(): boolean {
    return this.remoteUMaterialsIssueReported;
  }

  public isRemoteUMaterialsIssueButtonVisible(): boolean {
    return this.loadedRemoteUMaterials && this.preStartInfo &&
    this.preStartInfo.accesses && !this.preStartInfo.accesses.remoteUMaterials;
  }

  public reportRemoteUMaterialsIssue(): void {
    this.onboardingService.reportRemoteUMaterialsIssue(this.preStartInfo.name, this.preStartInfo.email)
      .subscribe(() => this.remoteUMaterialsIssueReported = true);
  }

  public isCodeRepositoryIssueButtonDisabled(): boolean {
    return this.codeRepositoryIssueReported;
  }

  public isCodeRepositoryIssueButtonVisible(): boolean {
    return this.loadedCodeRepositoryAccess && this.preStartInfo &&
      this.preStartInfo.accesses && !this.preStartInfo.accesses.codeRepository;
  }

  public isRemoteUCodeRepositoryIssueVisible(): boolean {
    return this.loadedRemoteUCodeBase && this.preStartInfo &&
      this.preStartInfo.accesses && !this.preStartInfo.accesses.loadedRemoteUCodeBase;
  }

  public reportCodeRepositoryIssue(): void {
    this.onboardingService.reportCodeRepositoryIssue(
    this.preStartInfo.ad, this.preStartInfo.name, this.preStartInfo.email).subscribe(() => {
    this.codeRepositoryIssueReported = true;
    });
  }

  public confirmAccesses(): void {
    this.onboardingService.confirmAccesses(this.preStartInfo.email).subscribe(() => {
      this.preStartInfo.accessesConfirmed = true;
      this.loadFinalStageServices();
    });
  }

  public getConfirmAccessesButtonText(): string {
    return this.accessesConfirmed() ? this.accessesConfirmedText : this.confirmAccessesText;
  }

  public isCommunicationChannelVisible(): boolean {
    return this.loadedCommunicationChannel && this.preStartInfo &&
      this.preStartInfo.accesses && !this.preStartInfo.accesses.loadedCommunicationChannel;
  }

  public loadFinalStageServices(): void {
    this.onboardingService.getAssignmentFolder(this.preStartInfo.name)
      .subscribe(
        statusResponse => {
          this.loadedAssignmentFolder = true;
          this.preStartInfo.assignmentFolder = statusResponse && statusResponse.status === 'Yes';
        },
        () => this.toasterService.popError('Unable to get assignment folder status')
      );

    this.onboardingService.getReadyToStart(this.preStartInfo.email)
      .subscribe(
        statusResponse => {
          this.loadedReadyToStart = true;
          this.preStartInfo.readyToStart = statusResponse && statusResponse.status === 'Yes';
        },
        () => this.toasterService.popError('Unable to get ready to start status')
      );

    this.onboardingService.getTicketsAssigned(this.preStartInfo.email)
      .subscribe(
        statusResponse => {
          this.loadedTicketsAssigned = true;
          this.preStartInfo.ticketsAssigned = statusResponse && statusResponse.status === 'Yes';
        },
        () => this.toasterService.popError('Unable to get tickets assigned status')
      );

    this.onboardingService.getJiraStatus(this.preStartInfo.name)
      .subscribe(
        statusResponse => {
          this.loadedJiraStatus = true;
          this.preStartInfo.accesses.jira = statusResponse && statusResponse.status === 'Yes';
        },
        () => this.toasterService.popError('Unable to get jira status')
      );

    if (this.showCodeRepositoryAccess) {
      this.onboardingService.getRemoteUCodeBaseAccess(this.preStartInfo.email)
        .subscribe(statusResponse => {
          this.preStartInfo.accesses.loadedRemoteUCodeBase = statusResponse && statusResponse.status === 'Yes';
          this.loadedRemoteUCodeBase = true;
        },
        () => this.toasterService.popError('Unable to get RemoteU code repository access status')
      );
    }

    this.onboardingService.getCommunicationChannelAccess(this.preStartInfo.email)
      .subscribe(statusResponse => {
        this.preStartInfo.accesses.loadedCommunicationChannel = statusResponse && statusResponse.status === 'Yes';
        this.loadedCommunicationChannel = true;
      },
        () => this.toasterService.popError('Unable to get Communication Channel access status')
      );

  }

  public isPipelineWithoutGithubAccount(): boolean {
    return this.preStartInfo && !this.utilsService.isPipelineWithGithubAccount(this.preStartInfo.pipeline);
  }

  public openTrainingMaterials(): void {
    this.portal.open(this.trainingsTemplate, this.portalOptions);
  }
}
