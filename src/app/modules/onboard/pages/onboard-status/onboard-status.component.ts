import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/shared/services/onboarding.service';
import { subDays } from 'date-fns';

@Component({
  selector: 'app-onboard-status',
  templateUrl: './onboard-status.component.html',
  styleUrls: ['./onboard-status.component.scss']
})
export class OnboardStatusComponent implements OnInit {
  private readonly allSet = 'You\'re All Set';
  private readonly notAllSet = 'You\'re Almost There';
  public constructor(
    private readonly onboardingService: OnboardingService
  ) {}

  public onboardStatus: any;

  public loaded = false;

  public getHeaderText(): string {
    return this.onboardStatus &&
      this.onboardStatus.ticketsAssigned &&
      this.onboardStatus.assignmentFolder &&
      this.onboardStatus.jiraCardCreated ? this.allSet : this.notAllSet;
  }

  public ngOnInit(): void {
    this.onboardingService.getOnboardStatus().subscribe(onboardStatus => {
      this.onboardStatus = onboardStatus;
      this.loaded = true;
    });
  }

  public getDefaultETA(): Date {
    return subDays(this.onboardStatus.startDate, 2);
  }

  public getJiraETA(): Date {
    return subDays(this.onboardStatus.startDate, 3);

  }

  public accessesConfirmed(): boolean {
    return this.onboardStatus && this.onboardStatus.accessesConfirmed;
  }

  public showConfirmAccessesButton(): boolean {
    return this.onboardStatus &&
      this.onboardStatus.accesses &&
      this.onboardStatus.accesses.itSystems &&
      this.onboardStatus.accesses.remoteUMaterials &&
      this.onboardStatus.accesses.codeRepository;
  }

  public confirmAccesses(): void {
    this.loaded = false;
    this.onboardingService.confirmAccesses().subscribe(() => {
      this.onboardStatus.accessesConfirmed = true;
      this.loaded = true;
    });
  }
}
