import { Component, OnInit } from '@angular/core';
import { subDays } from 'date-fns';

import { OnboardingService } from 'src/app/shared/services/onboarding.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

import { DfToasterService } from '@devfactory/ngx-df';

@Component({
  selector: 'app-onboard-status',
  templateUrl: './onboard-status.component.html',
  styleUrls: ['./onboard-status.component.scss']
})
export class OnboardStatusComponent implements OnInit {
  private readonly allSet = 'You\'re All Set';
  private readonly notAllSet = 'You\'re Almost There';
  public constructor(
    private readonly onboardingService: OnboardingService,
    private readonly profileService: ProfileService,
    private readonly toasterService: DfToasterService,
  ) {}

  public preStartInfo: any;

  public loadedItAccessSystems = false;

  public loadedRemoteUMaterials = false;

  public loadedCodeRepositoryAccess = false;

  public getHeaderText(): string {
    return this.preStartInfo &&
      this.preStartInfo.ticketsAssigned &&
      this.preStartInfo.assignmentFolder &&
      this.preStartInfo.welcomeEmailSent ? this.allSet : this.notAllSet;
  }

  public ngOnInit(): void {
    this.profileService.getProfile().subscribe(profile => {
      this.onboardingService.getPreStartInfo().subscribe(preStartInfo => {
        this.preStartInfo = preStartInfo;
        this.preStartInfo.name = profile.icName;
        this.preStartInfo.pipeline = profile.pipeline;
        this.preStartInfo.startDate = profile.startDate;
        this.preStartInfo.alternativeEmail = profile.xoLoginEmail;
        this.preStartInfo.email = profile.companyEmail;
        this.preStartInfo.ad = profile.adAccount;

        this.onboardingService.getItSystemAccess(this.preStartInfo.ad)
          .subscribe(
            statusResponse => this.loadedItAccessSystems = statusResponse && statusResponse.status === 'Yes',
            () => this.toasterService.popError('Unable to get it system access status')
          );
        this.onboardingService.getRemoteUMaterialsAccess(this.preStartInfo.ad, this.preStartInfo.email)
          .subscribe(
            statusResponse => this.loadedRemoteUMaterials = statusResponse && statusResponse.status === 'Yes',
            () => this.toasterService.popError('Unable to get remote material access status')
          );
        this.onboardingService.getCodeRepositoryAccess(this.preStartInfo.ad, this.preStartInfo.email)
          .subscribe(
            statusResponse => this.loadedItAccessSystems = statusResponse && statusResponse.status === 'Yes',
            () => this.toasterService.popError('Unable to get code repository access status')
          );
      });
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

  public showConfirmAccessesButton(): boolean {
    return this.preStartInfo &&
      this.preStartInfo.accesses &&
      this.preStartInfo.accesses.itSystems &&
      this.preStartInfo.accesses.remoteUMaterials &&
      this.preStartInfo.accesses.codeRepository;
  }

  public confirmAccesses(): void {
    this.onboardingService.confirmAccesses().subscribe(() => {
      this.preStartInfo.accessesConfirmed = true;
    });
  }
}
